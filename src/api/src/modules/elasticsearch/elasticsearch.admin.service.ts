import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ElasticsearchService,
  ElasticsearchService as ESClient,
} from '@nestjs/elasticsearch';
import { logger } from './../../utils/logger/logger.js';
import { Repository } from 'typeorm';
import { Sections } from './../../entities/sections.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from './../../entities/images.entity.js';
import { convertTimeObject } from './../../utils/convertTime.util.js';
import {
  ElasticBody,
  ImageData,
  ProductClient,
  ProductElastic,
  SectionClient,
  SectionElastic,
} from './../../interfaces/adminGlobal.js';
import { ResultItems } from './../../interfaces/responseGlobal.js';
import { payLoad } from './dto/elasticsearch.dto.js';
import { formatResults } from './../../utils/formatResults.util.js';
import { Colors } from './../../entities/colors.entity.js';
import {
  generateLinkProduct,
  generateLinkSection,
} from './../../utils/generateLink.util.js';
import { searchFromElastic } from './../../utils/searchFromElastic.util.js';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type.js';

@Injectable()
export class ElasticsearchAdminService {
  public readonly elasticsearchService: ESClient;
  constructor(
    @Inject(ElasticsearchService)
    private readonly esClient: ESClient,
    @InjectRepository(Sections as EntityClassOrSchema)
    private readonly sectionsRepository: Repository<Sections>,
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
    @InjectRepository(Colors)
    private readonly colorsRepository: Repository<Colors>,
  ) {
    this.elasticsearchService = esClient;
  }

  private readonly index: string | undefined = process.env.ELASTIC_INDEX;
  private readonly aliasName: string = `${this.index || 'shop'}_alias`;

  /**
   * Подготавливает данные изображений для ElasticSearch
   * @param data
   * @param dbImages
   */
  prepareImageData(data: number[], dbImages: Images[]): ImageData[] {
    const images = dbImages.filter((item) => data.includes(item.id));

    if (!images) {
      return [];
    }

    return images.flatMap(
      (image: Images): ImageData => ({
        alt: image.name,
        src: image.path,
      }),
    );
  }

  /**
   * Формирует данные продуктов для эластика
   * @param data
   * @param dataImages
   */
  async prepareDataProduct(data: Sections[], dataImages: Images[]) {
    const result: ProductElastic[] = [];
    await Promise.all(
      data
        .filter((section) => section.products.length > 0)
        .flatMap((section) =>
          section.products.map((item) => {
            const resultProduct = convertTimeObject(item) as ProductClient;
            delete resultProduct.color;
            result.push({
              ...resultProduct,
              sectionName: section.name,
              hexColor: item.color.hex,
              type: 'product',
              images: this.prepareImageData(
                item.images as number[],
                dataImages,
              ),
              url: generateLinkProduct(item, section.id, data),
            });
          }),
        ),
    );
    return result;
  }

  /**
   * Формирует данные разделов для эластика
   * @param data
   * @param dataImages
   */
  async prepareDataSection(data: Sections[], dataImages: Images[]) {
    const result: SectionElastic[] = [];
    await Promise.all(
      data.map((item) => {
        if (!item.images) {
          item.images = [];
        }
        let parentName: string | undefined;
        if (item.id_parent) {
          const parent = data.find((parent) => parent.id === item.id_parent);
          parentName = parent?.name;
        }
        const resultSection = convertTimeObject(item) as SectionClient;
        delete resultSection.products;
        result.push({
          ...resultSection,
          images: this.prepareImageData(item.images, dataImages),
          type: 'section',
          sectionName: parentName,
          url: generateLinkSection(item, data),
        });
      }),
    );
    return result;
  }

  /**
   * Формирование данных для эластика
   * @private
   * @param dbItems
   */
  private async prepareDataElastic(
    dbItems: Sections[],
  ): Promise<(ProductElastic | SectionElastic)[]> {
    const dbImages = await this.imagesRepository.find();

    const product: ProductElastic[] = await this.prepareDataProduct(
      dbItems,
      dbImages,
    );

    const section: SectionElastic[] = await this.prepareDataSection(
      dbItems,
      dbImages,
    );

    return [...product, ...section];
  }

  /**
   * Строит массив фильтров для ElasticSearch на основе параметров запроса
   * @param payLoad
   */
  getFilterAdmin(payLoad: payLoad): any[] {
    const { type, searchName, filterSection } = payLoad;
    const filter: any[] = [
      {
        match: { type: type },
      },
    ];

    if (searchName) {
      filter.push({
        wildcard: { 'name.keyword': `*${searchName}*` },
      });
    }
    if (filterSection) {
      filter.push({
        term: { section: filterSection },
      });
    }
    return filter;
  }

  /**
   * Создает индекс в ElasticSearch
   * @param payLoad
   */
  async createIndex(payLoad: payLoad) {
    try {
      const currentDate = new Date()
        .toISOString()
        .replace(/[:.-]/g, '')
        .toLowerCase();
      const newIndexName = `${this.index || 'shop'}_${currentDate}`;
      await this.elasticsearchService.indices.create({
        index: newIndexName,
        body: {
          settings: {
            number_of_shards: 1,
            number_of_replicas: 0,
          },
        },
      });

      const dbItems: Sections[] = await this.sectionsRepository.find({
        join: {
          alias: 'sections',
          leftJoinAndSelect: {
            products: 'sections.products',
            color: 'products.color',
          },
        },
      });
      if (!dbItems) {
        throw new NotFoundException('Section not found');
      }

      const document = await this.prepareDataElastic(dbItems);

      await this.bulkIndexDocuments(newIndexName, document);

      let oldIndices: string[] = [];
      try {
        const aliasResponse = await this.elasticsearchService.indices.getAlias({
          name: this.aliasName,
        });

        oldIndices = Object.keys(aliasResponse);
      } catch (err) {
        console.log(err);
      }

      await this.elasticsearchService.indices.updateAliases({
        body: {
          actions: [
            ...oldIndices.map((index) => ({
              remove: { index, alias: this.aliasName },
            })),
            { add: { index: newIndexName, alias: this.aliasName } },
          ],
        },
      });
      for (const oldIndex of oldIndices) {
        await this.elasticsearchService.indices.delete({
          index: oldIndex,
        });
      }

      //TODO: придумать как исправить костыль
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return payLoad.getItems
        ? await this.getItemsFilter(payLoad)
        : { message: 'Пере индексация выполнена' };
    } catch (err) {
      logger.error('Error from elastic.createIndex: ', err);
      throw new BadRequestException(
        'An error occurred while accepting document indexing.',
      );
    }
  }

  /**
   * Добавление документов в ElasticSearch при создании индекса
   * @param index
   * @param documents
   */
  async bulkIndexDocuments(
    index: string,
    documents: (ProductElastic | SectionElastic)[],
  ): Promise<void> {
    if (!documents.length) {
      logger.log('No documents to index. Skipping bulk operation.');
      return;
    }
    try {
      const body: ElasticBody[] = documents.flatMap(
        (doc: SectionElastic | ProductElastic) => [
          { index: { _index: index, _id: doc.id } },
          doc,
        ],
      ) as ElasticBody[];
      await this.elasticsearchService.bulk({ body });
    } catch (err) {
      logger.error('Error from elastic.bulkIndexDocuments: ', err);
      throw new BadRequestException(
        'An error occurred while accepting and filling out the document.',
      );
    }
  }

  /**
   * Добавление документа раздела в ElasticSearch
   * @param id
   * @param document
   * @param type
   */
  async addSectionDocument(id: string, document: SectionClient, type: string) {
    try {
      let imageData: ImageData[] = [];
      if (document.images) {
        const dbImages = await this.imagesRepository.find();
        imageData = this.prepareImageData(document.images, dbImages);
      }
      const sections = await this.sectionsRepository.find();

      const resultDocument: SectionElastic = {
        ...document,
        type,
        images: imageData,
      };

      if (resultDocument.id_parent) {
        const parent = sections.find(
          (item) => item.id === resultDocument.id_parent,
        );
        resultDocument.sectionName = parent?.name;
      }

      resultDocument.url = generateLinkSection(resultDocument, sections);

      return await this.elasticsearchService.index({
        index: this.aliasName,
        id: id,
        body: resultDocument,
      });
    } catch (err) {
      logger.error('Error from elastic.addSectionDocument: ', err);
      throw new BadRequestException('Error adding section document');
    }
  }

  /**
   * Добавление документа продукта в ElasticSearch
   * @param id
   * @param document
   * @param type
   */
  async addProductDocument(id: string, document: ProductClient, type: string) {
    try {
      let imageData: ImageData[] = [];
      if (document.images) {
        const dbImages = await this.imagesRepository.find();
        imageData = this.prepareImageData(document.images, dbImages);
      }
      const sections = await this.sectionsRepository.find();

      const resultDocument: ProductElastic = {
        ...document,
        type,
        images: imageData,
      };

      if (resultDocument.section) {
        const section = sections.find(
          (item) => item.id === Number(resultDocument.section),
        );
        resultDocument.sectionName = section?.name;
      }

      if (resultDocument.color) {
        const color = await this.colorsRepository.findOne({
          where: { id: Number(resultDocument.color) },
        });
        resultDocument.hexColor = color?.hex;
      }

      resultDocument.url = generateLinkProduct(
        resultDocument,
        Number(resultDocument.section),
        sections,
      );

      return await this.elasticsearchService.index({
        index: this.aliasName,
        id: id,
        body: resultDocument,
      });
    } catch (err) {
      logger.error('Error from elastic.addProductDocument: ', err);
      throw new BadRequestException('Error adding product document');
    }
  }

  /**
   * Обновление данных документа в ElasticSearch
   * @param id
   * @param document
   * @param type
   */
  async updateDocument(
    id: string,
    document: SectionClient | ProductClient,
    type: string,
  ) {
    try {
      await this.deleteDocument(id);
      if (type === 'section') {
        return await this.addSectionDocument(
          id,
          document as SectionClient,
          type,
        );
      }
      return await this.addProductDocument(id, document as ProductClient, type);
    } catch (err) {
      logger.error('Error from elastic.updateDocument: ', err);
      throw new BadRequestException('Error updating document');
    }
  }

  /**
   * Удаление документа в ElasticSearch
   * @param id
   */
  async deleteDocument(id: string) {
    try {
      return await this.elasticsearchService.delete({
        index: this.aliasName,
        id: id,
      });
    } catch (err) {
      logger.error('Error from elastic.deleteDocument: ', err);
      throw new BadRequestException('Error deleting document');
    }
  }

  /**
   * Получение отфильтрованных данных из ElasticSearch
   * @param payLoad
   */
  async getItemsFilter(payLoad: payLoad): Promise<ResultItems> {
    try {
      const { from, size } = payLoad;
      const filter = this.getFilterAdmin(payLoad);

      const items = await searchFromElastic(
        {
          size: Number(size),
          from: Number(from),
          query: { bool: { filter } },
        },
        this.elasticsearchService,
      );

      return formatResults(items.items, items.total);
    } catch (err) {
      logger.error('Error from elastic.getShopByElastic: ', err);
      throw new BadRequestException('Error while receiving data');
    }
  }

  /**
   * Вывод наименование записей из ElasticSearch
   * @param payLoad
   */
  async getName(payLoad: payLoad): Promise<SectionElastic[]> {
    const { type, searchName, size, typeForm } = payLoad;
    try {
      if (searchName == undefined) {
        return [];
      }

      const result = await searchFromElastic(
        {
          size,
          source: ['id', 'name', 'level'],
          query: {
            bool: {
              must: [{ match: { type: type } }],
              should: [{ wildcard: { name: `*${searchName}*` } }],
              minimum_should_match: 1,
            },
          },
        },
        this.elasticsearchService,
      );
      let testResult = result.items as SectionElastic[];
      if (typeForm && typeForm === 'section') {
        testResult = testResult.filter((section) => section.level === 1);
      }
      return testResult.map((section) => ({
        ...section,
        name: '.'.repeat(section.level) + section.name,
      }));
    } catch (err) {
      logger.error('Error from elastic.getNameShopByElastic: ', err);
      throw new BadRequestException('Error getting name');
    }
  }
}
