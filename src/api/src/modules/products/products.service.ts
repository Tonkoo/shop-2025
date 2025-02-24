import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { QueryFailedError, Repository, DataSource, QueryRunner } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Products } from '../../entities/products.entity';
import { logger } from '../../utils/logger/logger';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { prepareData } from '../../utils/prepare.util';
import { SectionDto } from '../sections/dto/section.dto';
import { Images } from '../../entities/images.entity';

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

  async createImages(data: ProductDto, queryRunner: QueryRunner) {
    const imagesSection: number[] = [];

    try {
      // @ts-ignore
      for (const image of data.images) {
        const newImage = queryRunner.manager.create(Images, {
          name: image.imagesName,
          path: image.imagesPath,
          type: image.imagesType,
        });
        await queryRunner.manager.save(newImage);
        imagesSection.push(newImage.id);
      }

      await queryRunner.commitTransaction();
      return imagesSection;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from productss.images.create: ', err);
      if (err instanceof QueryFailedError) {
        // @ts-ignore
        switch (err.code) {
          case '23502':
            throw new BadRequestException('Missing required field.');
          case '42601':
            throw new InternalServerErrorException(
              'There is an error in the database query syntax.',
            );
          default:
            throw err;
        }
      }

      throw new BadRequestException('An error occurred while adding the file.');
    }
  }

  async saveProducts(data) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const idImages = await this.createImages(data, queryRunner);
      return await this.create(data, idImages);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from products.save: ', err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async create(data: ProductDto, idImages: number[]) {
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

      // const newData = prepareData(data, ['getProduct']);

      // await this.productsRepo.save(newData);
      const newData = await this.productsRepo.save({
        code: data.code,
        name: data.name,
        images: idImages,
        price: data.price,
        color: data.color,
        description: data.description,
        id_section: section.id,
        show_on_main: data.showOnMain,
        main_slider: data.mainSlider,
        getProduct: data.getProduct,
      });

      if (data.getProduct) {
        return await this.getList();
      }
      return newData;
    } catch (err) {
      logger.error('Error from product.create: ', err);
      if (err instanceof QueryFailedError) {
        // @ts-ignore
        switch (err.code) {
          case '23503':
            throw new BadRequestException(
              'Invalid reference: Related entity does not exist.',
            );
          case '23502':
            throw new BadRequestException('Missing required field.');
          case '42601':
            throw new InternalServerErrorException(
              'There is an error in the database query syntax.',
            );
          default:
            throw err;
        }
      }

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
      throw err;
    }
  }

  async updateById(id: number, data: ProductDto) {
    try {
      // TODO: передавать только те поля которые пришли в data

      const newData = prepareData(data, ['getProduct']);

      return await this.productsRepo.manager.transaction(async () => {
        await this.productsRepo.update({ id: id }, newData);

        const updatedProduct = await this.productsRepo.findOne({
          where: { id: id },
        });

        await this.EsServices.updateDocument(
          'shop',
          id.toString(),
          updatedProduct,
          'product',
        );

        if (data.getProduct) {
          return await this.getList();
        }
        return newData;
      });
      // await this.productsRepo.update({ id: id }, newData);

      // return newData;
    } catch (err) {
      // TODO: если exception 404 throw NotFoundException, 400 throw BadRequestExecption
      logger.error('Error from product.update: ', err);
      if (err instanceof QueryFailedError) {
        // @ts-ignore
        switch (err.code) {
          case '23503':
            throw new BadRequestException(
              'Invalid reference: Related entity does not exist.',
            );
          case '23505':
            throw new BadRequestException(
              'Duplicate entry: This value already exists.',
            );
          case '23502':
            throw new BadRequestException('Missing required field.');
          default:
            throw err;
        }
      }

      throw new BadRequestException(
        'An error occurred while updating the product.',
      );
    }
  }
  async deleteById(id: number, data: ProductDto) {
    try {
      await this.productsRepo.delete(id);

      if (data.getProduct) {
        return await this.getList();
      }

      return id;
    } catch (err) {
      logger.error('Error from products.delete : ', err);
      throw new BadRequestException(
        'An error occurred while updating the product.',
      );
    }
  }
}
