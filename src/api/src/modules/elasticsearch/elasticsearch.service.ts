import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';
import { logger } from '../../utils/logger/logger';
import { In, Repository } from 'typeorm';
import { Products } from '../../entities/products.entity';
import { Sections } from '../../entities/sections.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from '../../entities/images.entity';
import { convertTimeArray } from '../../utils/convertTime.util';
import {
  elasticBody,
  imageData,
  mainLayout,
  payLoadTest,
  ProductClient,
  ProductElastic,
  ProductEntities,
  resultItems,
  SectionClient,
  SectionElastic,
  SectionEntities,
} from '../../interfaces/global';
import { payLoad } from './dto/elasticsearch.dto';
import {
  formatMainContent,
  formatResults,
} from '../../utils/formatResults.util';

@Injectable()
export class ElasticsearchService {
  constructor(
    private readonly elasticsearchService: ESClient,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(Sections)
    private readonly sectionsRepository: Repository<Sections>,
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
  ) {}
  private readonly index: string | undefined = process.env.ELASTIC_INDEX;

  async prepareImageData(data: number[]): Promise<imageData[]> {
    const images: Images[] | null = await this.imagesRepository.findBy({
      id: In(data),
    });
    return images.map(
      (image: Images): imageData => ({
        alt: image.name,
        src: image.path,
      }),
    );
  }

  async generateBlockImages(
    data: (SectionClient | ProductClient)[],
    type: string,
  ): Promise<(SectionEntities | ProductEntities)[]> {
    return await Promise.all(
      data.map(
        async (
          item: SectionClient | ProductClient,
        ): Promise<SectionEntities | ProductEntities> => {
          if (!item.images) {
            item.images = [];
          }

          if (!Array.isArray(item.images)) {
            throw new BadRequestException('Invalid images format');
          }

          const imageIds: number[] = item.images;
          const images: Images[] = await this.imagesRepository.findBy({
            id: In(imageIds),
          });

          const imageData: imageData[] = images.map(
            (image: Images): imageData => ({
              alt: image.name,
              src: image.path,
            }),
          );

          return {
            ...item,
            images: imageData,
            type: type,
          };
        },
      ),
    );
  }

  private async enrichData(
    dbProduct: Products[],
    dbSection: Sections[],
  ): Promise<(ProductEntities | SectionEntities)[]> {
    const products: (ProductClient | SectionClient)[] =
      convertTimeArray(dbProduct);

    const documentsProduct = await this.generateBlockImages(
      products,
      'product',
    );

    const sections: (ProductClient | SectionClient)[] =
      convertTimeArray(dbSection);

    const documentsSection = await this.generateBlockImages(
      sections,
      'section',
    );

    const processedProducts = await Promise.all(
      documentsProduct.map(async (item) => {
        if (item.type === 'product') {
          const product = item as ProductEntities;
          let sectionName: string | undefined;

          if (product.section) {
            const section = await this.sectionsRepository.findOne({
              where: { id: Number(product.section) },
            });
            sectionName = section?.name;
          }

          return { ...product, sectionName };
        }
        return item;
      }),
    );

    const processedSections = await Promise.all(
      documentsSection.map(async (item) => {
        if (item.type === 'section') {
          const section = item as SectionEntities;
          let parentName: string | undefined;

          if (section.id_parent) {
            const parent = await this.sectionsRepository.findOne({
              where: { id: section.id_parent },
            });
            parentName = parent?.name;
          }

          return { ...section, sectionName: parentName };
        }
        return item;
      }),
    );

    return [...processedProducts, ...processedSections];
  }

  async searchFromElastic(payLoad: payLoadTest) {
    const { query, from, size, source } = payLoad;

    const items = await this.elasticsearchService.search({
      index: process.env.ELASTIC_INDEX,
      body: {
        _source: source,
        query,
        from,
        size,
      },
    });

    if (!items?.hits?.hits) {
      throw new NotFoundException('Not found items');
    }

    return items;
  }

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

      const dbProduct: Products[] = await this.productRepository.find({
        relations: ['section'],
        loadRelationIds: true,
      });

      if (!dbProduct) {
        throw new NotFoundException('Products not found');
      }

      const dbSection: Sections[] = await this.sectionsRepository.find();
      if (!dbSection) {
        throw new NotFoundException('Section not found');
      }

      const document = await this.enrichData(dbProduct, dbSection);

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

  async bulkIndexDocuments(
    index: string,
    documents: (ProductEntities | SectionEntities)[],
  ): Promise<void> {
    if (!documents.length) {
      console.log('No documents to index. Skipping bulk operation.');
      return;
    }
    try {
      const body: elasticBody[] = documents.flatMap(
        (doc: SectionEntities | ProductEntities) => [
          { index: { _index: index, _id: doc.id } },
          doc,
        ],
      ) as elasticBody[];
      await this.elasticsearchService.bulk({ body });
    } catch (err) {
      logger.error('Error from elastic.bulkIndexDocuments: ', err);
      throw new BadRequestException(
        'An error occurred while accepting and filling out the document.',
      );
    }
  }

  async addSectionDocument(
    index: string,
    id: string,
    document: SectionClient,
    type: string,
  ) {
    try {
      let imageData: imageData[] = [];
      if (document.images) {
        imageData = await this.prepareImageData(document.images);
      }

      const resultDocument: SectionEntities = {
        ...document,
        type,
        images: imageData,
      };

      if (resultDocument.id_parent) {
        const parent = await this.sectionsRepository.findOne({
          where: { id: Number(resultDocument.id_parent) },
        });
        resultDocument.sectionName = parent?.name;
      }

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

  async addProductDocument(
    index: string,
    id: string,
    document: ProductClient,
    type: string,
  ) {
    try {
      let imageData: imageData[] = [];
      if (document.images) {
        imageData = await this.prepareImageData(document.images);
      }

      const resultDocument: ProductEntities = {
        ...document,
        type,
        images: imageData,
      };

      if (resultDocument.section) {
        const parent = await this.sectionsRepository.findOne({
          where: { id: Number(resultDocument.section) },
        });
        resultDocument.sectionName = parent?.name;
      }

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

  getFilter(payLoad: payLoad): any[] {
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

  async getItemsFilter(payLoad: payLoad): Promise<resultItems> {
    try {
      const { from, size } = payLoad;
      const filter = this.getFilter(payLoad);

      const items = await this.searchFromElastic({
        size: Number(size),
        from: Number(from),
        query: { bool: { filter } },
      });
      const total: { value: number } = items.hits.total as { value: number };
      const rawItems: (SectionElastic | ProductElastic)[] = items.hits.hits.map(
        (item) => item._source as SectionElastic | ProductElastic,
      );

      return formatResults(rawItems, total);
    } catch (err) {
      logger.error('Error from elastic.getShopByElastic: ', err);
      throw new BadRequestException('Error while receiving data');
    }
  }

  async getNameShopByElastic(payLoad: payLoad): Promise<SectionElastic[]> {
    const { type, searchName, size, typeForm } = payLoad;
    try {
      if (searchName == undefined) {
        return [];
      }

      const result = await this.searchFromElastic({
        size,
        query: {
          bool: {
            must: [{ match: { type: type } }],
            should: [{ wildcard: { name: `*${searchName}*` } }],
            minimum_should_match: 1,
          },
        },
      });
      const testResult = result.hits.hits.map(
        (item) => item._source,
      ) as SectionElastic[];
      return testResult
        .filter((section) => {
          if (typeForm && typeForm === 'section') {
            return section.level === 1;
          }
          return true;
        })
        .map((section) => ({
          ...section,
          name: '.'.repeat(section.level) + section.name,
        }));
    } catch (err) {
      logger.error('Error from elastic.getNameShopByElastic: ', err);
      throw new BadRequestException('Error getting name');
    }
  }

  async getItemMain(layout: string) {
    try {
      const items = await this.searchFromElastic({
        query: {
          bool: {
            should: [
              { term: { show_on_main: 'true' } },
              { term: { main_slider: 'true' } },
            ],
            minimum_should_match: 1,
          },
        },
      });
      const rawItems: ProductElastic[] = items.hits.hits.map(
        (item) => item._source as ProductElastic,
      );
      return formatMainContent(
        rawItems,
        layout === 'true' ? await this.getLayout() : null,
      );
    } catch (err) {
      logger.error('Error from elastic.getItemMain: ', err);
      throw new BadRequestException('Error getting main page items');
    }
  }
  // TODO: если у родительского раздела есть дочерние, то добавить св-ва item и в внурь него складывать дочерние элементы
  async getLayout(): Promise<mainLayout> {
    try {
      const layout = await this.searchFromElastic({
        query: { bool: { must: { term: { type: 'section' } } } },
      });
      const menu: SectionElastic[] = layout.hits.hits.map(
        (item) => item._source as SectionElastic,
      );
      return {
        menu,
      };
    } catch (err) {
      logger.error('Error from elastic.getLayout: ', err);
      throw new BadRequestException('Error getting menu items');
    }
  }
}
