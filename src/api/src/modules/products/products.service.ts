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
import {
  ProductBase,
  ProductClient,
  resultItems,
} from '../../interfaces/global';
import { payLoad } from '../elasticsearch/dto/elasticsearch.dto';
import { transliterate as tr } from 'transliteration';
import { createImages } from '../../utils/createImages.util';
import { convertTimeObject } from '../../utils/convertTime.util';
import { Images } from '../../entities/images.entity';
import { camelCaseConverter } from '../../utils/toCamelCase.util';
import { removeImages } from '../../utils/removeImages.util';

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

  processingData(data: ProductDto) {
    if (data.name) {
      data.code = tr(data.name.toLowerCase(), { replace: { ' ': '-' } });
    }
    if (!Array.isArray(data.images)) {
      data.images = [];
    }
    if (data.price) {
      data.price = Math.round(Number(data.price));
    }
    if (data.section) {
      data.section = { id: data.sectionId };
    }
    if (data.mainSlider == Boolean('true')) {
      data.mainSlider = true;
    }
  }

  async create(
    data: ProductDto,
    files: { files: Express.Multer.File[] },
  ): Promise<Products | resultItems[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.processingData(data);
      const newProduct: Products = await this.productsRepo.save(
        prepareData(data, [
          'searchName',
          'getProduct',
          'from',
          'size',
          'type',
          'sectionId',
          'sectionName',
          'idSection',
          'typeForm',
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
      }

      const resultProduct = await this.productsRepo.findOne({
        where: { id: newProduct.id },
        relations: ['section'],
        loadRelationIds: true,
      });

      if (!resultProduct) {
        throw new NotFoundException('Product not found');
      }

      await queryRunner.commitTransaction();

      const testProduct = convertTimeObject(resultProduct) as ProductClient;

      await this.EsServices.addProductDocument(
        this.index || 'shop',
        newProduct.id.toString(),
        testProduct,
        'product',
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const searchParams: payLoad = {
        type: data.type,
        from: Number(data.from),
        size: Number(data.size),
        searchName: data.searchName,
      };

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

  async getProductById(id: number): Promise<ProductBase> {
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
      if (product.section) {
        product.section = {
          id: product.section.id,
          name: product.section.name,
        };
      }

      return camelCaseConverter(product) as ProductBase;
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
      const currentProduct: Products | null = await this.productsRepo.findOne({
        where: { id: id },
      });

      if (!currentProduct) {
        throw new NotFoundException('Product not found');
      }

      this.processingData(data);

      if (files.files) {
        data.images = await createImages(queryRunner, files);
      }

      if (data.images) {
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
          'typeForm',
        ]),
      );

      if (!newProduct) {
        throw new BadRequestException(
          'An error occurred while saving the product.',
        );
      }

      const updatedProduct: Products | null = await this.productsRepo.findOne({
        where: { id: id },
        relations: ['section'],
        loadRelationIds: true,
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
      const searchParams: payLoad = {
        type: data.type,
        from: Number(data.from),
        size: Number(data.size),
        searchName: data.searchName,
      };
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

      const delItems = await this.productsRepo.delete(id);

      if (!delItems) {
        throw new BadRequestException(
          'An error occurred while deleting the product.',
        );
      }

      await removeImages(currentProduct, this.imagesRepository, queryRunner);

      await queryRunner.commitTransaction();

      await this.EsServices.deleteDocument(this.index || 'shop', id.toString());

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const searchParams: payLoad = {
        type: data.type,
        from: Number(data.from),
        size: Number(data.size),
        searchName: data.searchName,
      };
      return data.getProduct
        ? await this.EsServices.getItemsFilter(searchParams)
        : id;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from products.delete: ', err);
      throw new BadRequestException(
        'An error occurred while deleting the product.',
      );
    }
  }
}
