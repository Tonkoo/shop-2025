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
import * as process from 'node:process';
import { convertTime } from '../../utils/convertTime.util';
import {
  elasticsearchResponse,
  imageData,
  documentProduct,
  documentSection,
  ProductEntities,
  SectionEntities,
  elasticBody,
  resultItems,
} from '../../interfaces/global';
import { camelCaseConverter } from '../../utils/toCamelCase.util';

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

  async generateBlockImages(
    data: (SectionEntities | ProductEntities)[],
    type: string,
  ): Promise<(documentSection | documentProduct)[]> {
    return await Promise.all(
      data.map(
        async (
          item: SectionEntities | ProductEntities,
        ): Promise<documentSection | documentProduct> => {
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

  async createIndex(): Promise<boolean> {
    try {
      await this.elasticsearchService.indices.delete({
        index: this.index || 'shop',
      });
    } catch {
      console.log('No index');
    }
    try {
      const products: (Products | Sections)[] = convertTime(
        await this.productRepository.find(),
      );
      const sections: (Products | Sections)[] = convertTime(
        await this.sectionsRepository.find(),
      );

      const documentsProduct: (documentProduct | documentSection)[] =
        await this.generateBlockImages(products, 'product');

      const documentsSection: (documentProduct | documentSection)[] =
        await this.generateBlockImages(sections, 'section');

      const document: (documentSection | documentProduct)[] = [
        ...documentsProduct,
        ...documentsSection,
      ];

      await this.bulkIndexDocuments(this.index || 'shop', document);
      return true;
    } catch (err) {
      logger.error('Error from elastic.createIndex: ', err);
      throw new BadRequestException(
        'An error occurred while accepting document indexing.',
      );
    }
  }

  async bulkIndexDocuments(
    index: string,
    documents: (documentSection | documentProduct)[],
  ): Promise<void> {
    const body: elasticBody[] = documents.flatMap(
      (doc: documentSection | documentProduct) => [
        { index: { _index: index, _id: doc.id } },
        doc,
      ],
    ) as elasticBody[];
    await this.elasticsearchService.bulk({ body });
  }

  async addDocument(
    index: string,
    id: string,
    document: Sections | Products,
    type: string,
  ) {
    try {
      const imageIds: number[] = document.images;
      const images: Images[] = await this.imagesRepository.findBy({
        id: In(imageIds),
      });
      const imageData: imageData[] = images.map(
        (image: Images): imageData => ({
          alt: image.name,
          src: image.path,
        }),
      );
      const updatedDocument = {
        ...document,
        type,
        images: imageData,
      };

      return await this.elasticsearchService.index({
        index: index,
        id: id,
        body: updatedDocument,
      });
    } catch (err) {
      logger.error('Error from elastic.addDocument: ', err);
      throw new BadRequestException('Error adding document');
    }
  }

  async updateDocument(
    index: string,
    id: string,
    document: Sections | Products,
    type: string,
  ) {
    try {
      await this.deleteDocument(index, id);

      return await this.addDocument(index, id, document, type);
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

  getFilter(type: string, name?: string): any[] {
    const filter: any[] = [
      {
        term: { type: type },
      },
    ];

    if (name) {
      filter.push({
        term: { name: name },
      });
    }

    return filter;
  }

  async getItems(): Promise<(Sections | Products)[]> {
    try {
      const result = await this.elasticsearchService.search({
        index: process.env.ELASTIC_INDEX,
        body: {
          query: {
            match_all: {},
          },
        },
      });

      if (!result?.hits?.hits) {
        throw new NotFoundException('Not found items');
      }

      return camelCaseConverter(
        result.hits.hits.map(
          (item): Sections | Products => item._source as Sections | Products,
        ),
      );
    } catch (err) {
      logger.error('Error from elastic.getShopByElastic: ', err);
      throw new BadRequestException('Error while receiving data');
    }
  }

  async getItemsFilter(
    type: string,
    from: number,
    size: number,
    name?: string,
  ): Promise<resultItems[]> {
    try {
      // TODO: для поиска разделов написать отдельный метод
      const filter = this.getFilter(type, name);
      // TODO: для поиска данных в эластике написать общий метод
      // TODO: написать метод для получения общего количества записей, взять из result
      const items = await this.elasticsearchService.search({
        index: process.env.ELASTIC_INDEX,
        body: {
          query: {
            bool: {
              filter: filter,
            },
          },
          from: from,
          size: size,
        },
      });
      if (!items?.hits?.hits) {
        throw new NotFoundException('Not found items');
      }

      const result: resultItems[] = [];
      const total = items.hits.total;
      if (typeof total === 'object' && total !== null && 'value' in total) {
        result.push({
          items: camelCaseConverter(
            items.hits.hits.map(
              (items): Sections | Products =>
                items._source as Sections | Products,
            ),
          ),
          total: total.value,
        });
      }

      return result;
    } catch (err) {
      logger.error('Error from elastic.getShopByElastic: ', err);
      throw new BadRequestException('Error while receiving data');
    }
  }

  async getNameShopByElastic(type: string): Promise<string[]> {
    try {
      const result = await this.elasticsearchService.search({
        index: process.env.ELASTIC_INDEX,
        body: {
          _source: ['name'],
          //  TODO: добавить query для поиска по совпадению
          query: {
            match: {
              type: type,
            },
          },
          size: 1000,
        },
      });
      return result.hits.hits.map((item) => item._source) as string[];
    } catch (err) {
      logger.error('Error from elastic.getNameShopByElastic: ', err);
      throw new BadRequestException('Error getting name');
    }
  }
}
