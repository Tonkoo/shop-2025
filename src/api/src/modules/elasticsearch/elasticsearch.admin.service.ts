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

// TODO: добавить аллиасы для путей в tsconfig.ts
import { logger } from '../../utils/logger/logger';
import { Repository } from 'typeorm';
import { Sections } from '../../entities/sections.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from '../../entities/images.entity';
import { convertTimeObject } from '../../utils/convertTime.util';
import {
  ElasticBody,
  ImageData,
  ProductClient,
  ProductEntities,
  SectionClient,
  SectionElastic,
  SectionEntities,
} from '../../interfaces/adminGlobal';
import { ResultItems } from '../../interfaces/responseGlobal';
import { payLoad } from './dto/elasticsearch.dto';
import { formatResults } from '../../utils/formatResults.util';
import { Colors } from '../../entities/colors.entity';
import {
  generateLinkProduct,
  generateLinkSection,
} from '../../utils/generateLink.util';
import { searchFromElastic } from '../../utils/searchFromElastic.util';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

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
    const result: ProductEntities[] = [];
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
    const result: SectionEntities[] = [];
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
  ): Promise<(ProductEntities | SectionEntities)[]> {
    const dbImages = await this.imagesRepository.find();

    const product: ProductEntities[] = await this.prepareDataProduct(
      dbItems,
      dbImages,
    );

    const section: SectionEntities[] = await this.prepareDataSection(
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
      //TODO: Прочитать alias Elastic
      const indexExists = await this.elasticsearchService.indices.exists({
        index: this.index || 'shop',
      });

      if (indexExists) {
        await this.elasticsearchService.indices.delete({
          index: this.index || 'shop',
        });
      }

      await this.elasticsearchService.indices.create({
        index: this.index || 'shop',
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

      await this.bulkIndexDocuments(this.index || 'shop', document);
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
    documents: (ProductEntities | SectionEntities)[],
  ): Promise<void> {
    if (!documents.length) {
      logger.log('No documents to index. Skipping bulk operation.');
      return;
    }
    try {
      const body: ElasticBody[] = documents.flatMap(
        (doc: SectionEntities | ProductEntities) => [
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
   * @param index
   * @param id
   * @param document
   * @param type
   */
  async addSectionDocument(
    index: string,
    id: string,
    document: SectionClient,
    type: string,
  ) {
    try {
      let imageData: ImageData[] = [];
      if (document.images) {
        const dbImages = await this.imagesRepository.find();
        imageData = this.prepareImageData(document.images, dbImages);
      }
      const sections = await this.sectionsRepository.find();

      const resultDocument: SectionEntities = {
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
        index: index,
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
   * @param index
   * @param id
   * @param document
   * @param type
   */
  async addProductDocument(
    index: string,
    id: string,
    document: ProductClient,
    type: string,
  ) {
    try {
      let imageData: ImageData[] = [];
      if (document.images) {
        const dbImages = await this.imagesRepository.find();
        imageData = this.prepareImageData(document.images, dbImages);
      }
      const sections = await this.sectionsRepository.find();

      const resultDocument: ProductEntities = {
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
        index: index,
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
   * @param index
   * @param id
   * @param document
   * @param type
   */
  async updateDocument(
    index: string,
    id: string,
    document: SectionClient | ProductClient,
    type: string,
  ) {
    try {
      await this.deleteDocument(index, id);
      if (type === 'section') {
        return await this.addSectionDocument(
          index,
          id,
          document as SectionClient,
          type,
        );
      }
      return await this.addProductDocument(
        index,
        id,
        document as ProductClient,
        type,
      );
    } catch (err) {
      logger.error('Error from elastic.updateDocument: ', err);
      throw new BadRequestException('Error updating document');
    }
  }

  /**
   * Удаление документа в ElasticSearch
   * @param index
   * @param id
   */
  async deleteDocument(index: string, id: string) {
    try {
      return await this.elasticsearchService.delete({
        index: index,
        id: id,
      });
    } catch (err) {
      logger.error('Error from elastic.deleteDocument: ', err);
      throw new BadRequestException('Error deleting document');
    }
  }

  /**
   * Получение отфильтрованых данных из ElasticSearch
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
