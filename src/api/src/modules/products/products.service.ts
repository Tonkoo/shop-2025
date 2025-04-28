import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Products } from '../../entities/products.entity';
import { logger } from '../../utils/logger/logger';
import { prepareData } from '../../utils/prepare.util';
import {
  ProductBase,
  ProductClient,
  resultItems,
} from '../../interfaces/global';
import { transliterate as tr } from 'transliteration';
import { createImages } from '../../utils/createImages.util';
import { convertTimeObject } from '../../utils/convertTime.util';
import { Images } from '../../entities/images.entity';
import { camelCaseConverter } from '../../utils/toCamelCase.util';
import {
  removeImages,
  removeUnusedImages,
} from '../../utils/removeImages.util';
import { Colors } from '../../entities/colors.entity';
import { formatResponse } from '../../utils/formatResults.util';
import { ElasticsearchAdminService } from '../elasticsearch/elasticsearch.admin.service';
import { checkCodeExists } from '../../utils/checkCodeExists';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
    @InjectRepository(Colors)
    private readonly colorsRepository: Repository<Colors>,
    private readonly EsServices: ElasticsearchAdminService,
    private readonly dataSource: DataSource,
  ) {}
  private readonly index: string | undefined = process.env.ELASTIC_INDEX;

  /**
   * Формирует данные перед отправкой
   * @param data
   */
  processingData(data: ProductDto) {
    if (data.name) {
      data.code = tr(data.name.toLowerCase(), { replace: { ' ': '-' } });
    }
    if ('images' in data && !data.images) {
      data.images = [];
    }
    if (data.price) {
      data.price = Math.round(Number(data.price));
    }
    if (data.mainSlider == Boolean('true')) {
      data.mainSlider = true;
    }
    if (data.idSection) {
      data.section = { id: data.idSection };
    }
    if (data.idColor) {
      data.color = { id: data.idColor };
    }
  }

  /**
   * Добавляет новую запись в таблице Products
   * @param data
   * @param files
   */
  async create(
    data: ProductDto,
    files: { files: Express.Multer.File[] },
  ): Promise<number | resultItems> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.processingData(data);

      await checkCodeExists(data.code, this.EsServices.elasticsearchService);
      const newProduct: Products = await this.productsRepo.save(
        prepareData(data, [
          'searchName',
          'getItems',
          'from',
          'size',
          'type',
          'sectionId',
          'sectionName',
          'idSection',
          'idColor',
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

      return await formatResponse(data, newProduct.id, this.EsServices);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from product.create: ', err);
      throw new BadRequestException(
        'An error occurred while creating the product.',
      );
    }
  }

  /**
   * Получает запись продукта по идентификатору
   * @param id
   */

  async getProductById(id: number): Promise<ProductBase> {
    try {
      const product: ProductBase | null = await this.productsRepo.findOne({
        where: { id },
        relations: ['section', 'color'],
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
        product.idSection = product.section.id;
      }
      if (product.color) {
        product.idColor = product.color.id;
      }

      return camelCaseConverter(product) as ProductBase;
    } catch (err) {
      console.error('Error for product.getProductById: ', err);
      throw new BadRequestException(
        'An error occurred while outputting product data.',
      );
    }
  }

  /**
   * Обновляет данные указанной записи в таблице Products
   * @param id
   * @param data
   * @param files
   */

  async updateById(
    id: number,
    data: ProductDto,
    files: { files: Express.Multer.File[] },
  ): Promise<resultItems | number> {
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

      await checkCodeExists(data.code, this.EsServices.elasticsearchService);

      await removeUnusedImages(
        data,
        currentProduct,
        this.imagesRepository,
        queryRunner,
      );
      const newProduct = await this.productsRepo.update(
        { id: id },
        prepareData(data, [
          'getItems',
          'type',
          'from',
          'size',
          'searchName',
          'sectionId',
          'sectionName',
          'idColor',
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

      return await formatResponse(data, data.id, this.EsServices);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from product.update: ', err);
      throw new BadRequestException(
        'An error occurred while updating the product.',
      );
    }
  }

  /**
   * Удаляет указанную запись в таблице Products
   * @param id
   * @param data
   */
  async deleteById(
    id: number,
    data: ProductDto,
  ): Promise<resultItems | number> {
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

      if (
        !Array.isArray(currentProduct.images) ||
        !currentProduct.images.length
      ) {
        currentProduct.images = null;
      }

      await removeImages(currentProduct, this.imagesRepository, queryRunner);

      await queryRunner.commitTransaction();

      await this.EsServices.deleteDocument(this.index || 'shop', id.toString());

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await formatResponse(data, id, this.EsServices);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from products.delete: ', err);
      throw new BadRequestException(
        'An error occurred while deleting the product.',
      );
    }
  }

  /**
   * Получает записи из таблицы Colors
   */

  async getColor(): Promise<Colors[]> {
    try {
      const colors: Colors[] = await this.colorsRepository.find();

      if (!colors) {
        throw new NotFoundException('Colors not found');
      }

      return colors;
    } catch (err) {
      logger.error('Error from products.getColor: ', err);
      throw new BadRequestException(
        'An error occurred while outputting colors data.',
      );
    }
  }
}
