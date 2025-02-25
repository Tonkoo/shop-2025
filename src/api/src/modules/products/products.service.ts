import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Products } from '../../entities/products.entity';
import { logger } from '../../utils/logger/logger';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { prepareData } from '../../utils/prepare.util';
import { Images } from '../../entities/images.entity';

interface ImageData {
  imagesName: string;
  imagesPath: string;
  imagesType: string;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
    private readonly EsServices: ElasticsearchService,
    private readonly dataSource: DataSource,
  ) {}
  private readonly index = process.env.ELASTIC_INDEX;

  async createImages(data: ProductDto, queryRunner: QueryRunner) {
    try {
      const images = data.images as unknown as ImageData[];
      const imagesProduct = await Promise.all(
        images.map(async (image) => {
          const newImage = queryRunner.manager.create(Images, {
            name: image.imagesName,
            path: image.imagesPath,
            type: image.imagesType,
          });
          await queryRunner.manager.save(newImage);
          return newImage.id;
        }),
      );
      data.images = imagesProduct;
      return imagesProduct;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from product.images.create: ', err);
      throw new BadRequestException('An error occurred while adding the file.');
    }
  }

  async saveProducts(data: ProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.createImages(data, queryRunner);
      const result = await this.create(data);
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from products.save: ', err);
      throw new BadRequestException(
        'An error occurred while saving the product.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async create(data: ProductDto) {
    try {
      const section = await this.sectionsRepo
        .findOne({
          where: {
            id: data.idSection,
          },
        })
        .catch(() => {
          return null;
        });
      if (!section) throw new NotFoundException('Section not found');

      const result = await this.productsRepo.save(
        prepareData(data, ['getProduct']),
      );

      await this.EsServices.addDocument(
        this.index || 'shop',
        result.id.toString(),
        result,
        'product',
      );

      if (data.getProduct) {
        return await this.getList();
      }
      return result;
    } catch (err) {
      logger.error('Error from product.create: ', err);
      throw new BadRequestException(
        'An error occurred while creating the product.',
      );
    }
  }

  async getList() {
    try {
      const products = await this.productsRepo.find();

      if (!products) throw new NotFoundException('Products not found');

      return products;
    } catch (err) {
      console.log('Error from products.getList: ', err);
      throw new BadRequestException(
        'An error occurred while outputting product data.',
      );
    }
  }

  async updateById(id: number, data: ProductDto) {
    try {
      const result = this.productsRepo.update(
        { id: id },
        prepareData(data, ['getProduct']),
      );

      if (result == null)
        throw new BadRequestException(
          'An error occurred while saving the product.',
        );

      const updatedProduct = await this.productsRepo.findOne({
        where: { id: id },
      });

      await this.EsServices.updateDocument(
        this.index || 'shop',
        id.toString(),
        updatedProduct,
        'product',
      );

      if (data.getProduct) {
        return await this.getList();
      }
      return updatedProduct;
    } catch (err) {
      logger.error('Error from product.update: ', err);
      throw new BadRequestException(
        'An error occurred while updating the product.',
      );
    }
  }
  async deleteById(id: number, data: ProductDto) {
    try {
      const result = this.productsRepo.delete(id);

      if (result == null)
        throw new BadRequestException(
          'An error occurred while deleting the product.',
        );

      await this.EsServices.deleteDocument(this.index || 'shop', id.toString());

      if (data.getProduct) {
        return await this.getList();
      }

      return id;
    } catch (err) {
      logger.error('Error from products.delete: ', err);
      throw new BadRequestException(
        'An error occurred while deleting the product.',
      );
    }
  }
}
