import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { DataSource, In, Repository, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Products } from '../../entities/products.entity';
import { logger } from '../../utils/logger/logger';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { prepareData } from '../../utils/prepare.util';
import { ProductBase, resultItems } from '../../interfaces/global';
import { payLoad } from '../elasticsearch/dto/elasticsearch.dto';
import { transliterate as tr } from 'transliteration';
import { createImages } from '../../utils/createImages.util';
import { convertTimeObject } from '../../utils/convertTime.util';
import { Images } from '../../entities/images.entity';
import { camelCaseConverter } from '../../utils/toCamelCase.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
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
      if (data.section) {
        data.section = { id: data.sectionId, name: data.sectionName };
      }
      const newProduct: Products = await this.productsRepo.save(
        prepareData(data, [
          'getProduct',
          'from',
          'size',
          'search_name',
          'type',
        ]),
      );
      if (!newProduct) {
        throw new BadRequestException(
          'An error occurred while create the product.',
        );
      }
      newProduct.images = [];
      if (files.files) {
        data.images = await createImages(queryRunner, files);
        await this.productsRepo.update(
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
      await queryRunner.rollbackTransaction();
      logger.error('Error from product.create: ', err);
      throw new BadRequestException(
        'An error occurred while creating the product.',
      );
    }
  }

  async getProductById(id: number): Promise<ProductBase[] | ProductBase> {
    try {
      const product: ProductBase | null = await this.productsRepo.findOne({
        where: { id },
        relations: ['section'],
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      if (product.images) {
        const imageIds: number[] = product.images;
        product.imageObject = await this.imagesRepository.findBy({
          id: In(imageIds),
        });
      }

      return camelCaseConverter(product);
    } catch (err) {
      console.error('Error for product.getProductById: ', err);
      throw new BadRequestException(
        'An error occurred while outputting product data.',
      );
    }
  }

  async updateById(
    id: number,
    data: ProductDto,
    files: { files: Express.Multer.File[] },
  ): Promise<resultItems[] | UpdateResult> {
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

      const currentProduct: Products | null = await this.productsRepo.findOne({
        where: { id: id },
      });
      console.log(id);

      if (!currentProduct) {
        throw new NotFoundException('Product not found');
      }

      if (data.name) {
        data.code = tr(data.name, { replace: { ' ': '-' } });
      }

      if (files.files) {
        data.images = await createImages(queryRunner, files);
      }

      if (!Array.isArray(data.images)) {
        data.images = [];
      }
      if (data.section) {
        data.section = { id: data.sectionId, name: data.sectionName };
      }
      data.price = Math.round(Number(data.price));
      console.log(data.price);
      const newImageIds = data.images;

      const currentImageIds: number[] | null = currentProduct.images;
      if (currentImageIds) {
        const imagesToDelete = currentImageIds.filter(
          (id) => !newImageIds.includes(id),
        );

        if (imagesToDelete.length > 0) {
          await this.imagesRepository.delete(imagesToDelete);
        }
      }

      const newProduct = await this.productsRepo.update(
        { id: id },
        prepareData(data, [
          'getProduct',
          'type',
          'from',
          'size',
          'searchName',
          'sectionId',
          'sectionName',
        ]),
      );

      if (!newProduct) {
        throw new BadRequestException(
          'An error occurred while saving the product.',
        );
      }

      const updatedProduct: Products | null = await this.productsRepo.findOne({
        where: { id: id },
      });
      if (!updatedProduct) {
        throw new NotFoundException('Product not found');
      }
      await queryRunner.commitTransaction();

      await this.EsServices.updateDocument(
        this.index || 'shop',
        id.toString(),
        convertTimeObject(updatedProduct),
        'product',
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data.getProduct
        ? await this.EsServices.getItemsFilter(searchParams)
        : newProduct;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from product.update: ', err);
      throw new BadRequestException(
        'An error occurred while updating the product.',
      );
    }
  }
  async deleteById(
    id: number,
    data: ProductDto,
  ): Promise<resultItems[] | number> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const searchParams: payLoad = {
      type: data.type,
      from: Number(data.from),
      size: Number(data.size),
      searchName: data.searchName,
    };
    try {
      if (!id) {
        throw new NotFoundException('ID is required for deletion.');
      }

      const currentProduct: Products | null = await this.productsRepo.findOne({
        where: { id: id },
      });

      if (!currentProduct) {
        throw new NotFoundException('Product not found');
      }

      const currentImageIds: number[] | null = currentProduct.images;

      const delItems = await this.productsRepo.delete(id);

      if (!delItems) {
        throw new BadRequestException(
          'An error occurred while deleting the product.',
        );
      }

      if (currentImageIds) {
        const delImages = await this.imagesRepository.delete(currentImageIds);
        if (!delImages) {
          throw new BadRequestException(
            'An error occurred while deleting the images.',
          );
        }
      }

      await queryRunner.commitTransaction();

      await this.EsServices.deleteDocument(this.index || 'shop', id.toString());

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result: resultItems[] | number = data.getProduct
        ? await this.EsServices.getItemsFilter(searchParams)
        : id;

      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from products.delete: ', err);
      throw new BadRequestException(
        'An error occurred while deleting the product.',
      );
    }
  }
}
