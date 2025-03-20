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
import { resultItems } from '../../interfaces/global';
import { payLoad } from '../elasticsearch/dto/elasticsearch.dto';
import { transliterate as tr } from 'transliteration';
import { createImages } from '../../utils/createImages.util';
import { convertTimeObject } from '../../utils/convertTime.util';

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
  private readonly index: string | undefined = process.env.ELASTIC_INDEX;

  async create(
    data: ProductDto,
    files: { files: Express.Multer.File[] },
  ): Promise<Products | resultItems[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const searchParams: payLoad = {
        type: data.type,
        from: Number(data.from),
        size: Number(data.size),
        searchName: data.searchName,
      };
      data.code = tr(data.name, { replace: { ' ': '-' } });
      data.price = Math.round(Number(data.price));
      if (!Array.isArray(data.images)) {
        data.images = [];
      }
      const newProduct: Products = await this.productsRepo.save(
        prepareData(data, ['getProduct']),
      );
      if (!newProduct) {
        throw new BadRequestException(
          'An error occurred while create the product.',
        );
      }
      newProduct.images = [];
      if (files.files) {
        console.log(12312);
        data.images = await createImages(queryRunner, files);
        await this.sectionsRepo.update(
          { id: newProduct.id },
          { images: data.images },
        );
        newProduct.images = data.images;
      }
      await queryRunner.commitTransaction();
      await this.EsServices.addDocument(
        this.index || 'shop',
        newProduct.id.toString(),
        convertTimeObject(newProduct),
        'product',
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data.getProduct
        ? await this.EsServices.getItemsFilter(searchParams)
        : newProduct;
    } catch (err) {
      logger.error('Error from product.create: ', err);
      throw new BadRequestException(
        'An error occurred while creating the product.',
      );
    }
  }

  async getList(): Promise<Products[]> {
    try {
      const products: Products[] = await this.productsRepo.find();

      if (!products) throw new NotFoundException('Products not found');

      return products;
    } catch (err) {
      console.log('Error from products.getList: ', err);
      throw new BadRequestException(
        'An error occurred while outputting product data.',
      );
    }
  }

  async updateById(
    id: number,
    data: ProductDto,
  ): Promise<Products | Products[]> {
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

      if (updatedProduct) {
        // await this.EsServices.updateDocument(
        //   this.index || 'shop',
        //   id.toString(),
        //   updatedProduct,
        //   'product',
        // );
      } else {
        throw new NotFoundException('Product not found');
      }

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
  async deleteById(id: number, data: ProductDto): Promise<number | Products[]> {
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
