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
  imageData,
  ProductEntities,
  SectionEntities,
  elasticBody,
  resultItems,
  payLoadTest,
  ProductClient,
  SectionClient,
  ProductBase,
} from '../../interfaces/global';
import { payLoad } from './dto/elasticsearch.dto';
import { formatResults } from '../../utils/formatResults.util';

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
  // : Promise<boolean>
  async createIndex() {
    try {
      const indexExists = await this.elasticsearchService.indices.exists({
        index: this.index || 'shop',
      });
      if (indexExists) {
        await this.elasticsearchService.indices.delete({
          index: this.index || 'shop',
        });
      }

      const dbProduct: Products[] = await this.productRepository.find({
        relations: ['section'],
      });

      if (!dbProduct) {
        throw new NotFoundException('Products not found');
      }

      const products: (ProductClient | SectionClient)[] =
        convertTimeArray(dbProduct);
      const dbSection: Sections[] = await this.sectionsRepository.find();
      if (!dbSection) {
        throw new NotFoundException('Section not found');
      }
      const sections: (ProductClient | SectionClient)[] =
        convertTimeArray(dbSection);

      const documentsProduct: (ProductEntities | SectionEntities)[] =
        await this.generateBlockImages(products, 'product');

      const documentsSection: (ProductEntities | SectionEntities)[] =
        await this.generateBlockImages(sections, 'section');

      const document: (ProductEntities | SectionEntities)[] = [
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
    documents: (SectionEntities | ProductEntities)[],
  ): Promise<void> {
    const body: elasticBody[] = documents.flatMap(
      (doc: SectionEntities | ProductEntities) => [
        { index: { _index: index, _id: doc.id } },
        doc,
      ],
    ) as elasticBody[];
    await this.elasticsearchService.bulk({ body });
  }

  async addDocument(
    index: string,
    id: string,
    document: SectionClient | ProductClient,
    type: string,
  ) {
    try {
      if (!document.images) {
        document.images = [];
      }
      const images: Images[] | null = await this.imagesRepository.findBy({
        id: In(document.images),
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
    document: SectionClient | ProductClient,
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

  async getItemsFilter(payLoad: payLoad): Promise<resultItems[]> {
    try {
      const { type, from, size, searchName } = payLoad;
      const filter = this.getFilter(type, searchName);

      const items = await this.searchFromElastic({
        size,
        from,
        query: {
          bool: {
            filter: filter,
          },
        },
      });

      return formatResults(items);
    } catch (err) {
      logger.error('Error from elastic.getShopByElastic: ', err);
      throw new BadRequestException('Error while receiving data');
    }
  }
  //TODO: Написать метод для опредения уровня раздела в древовиндой структуре (Level 1"." Laval 2 ".." и т.д.)
  async getNameShopByElastic(payLoad: payLoad): Promise<string[]> {
    const { searchName, size } = payLoad;
    try {
      if (searchName == undefined) {
        return [];
      }

      const result = await this.searchFromElastic({
        size,
        query: {
          bool: {
            must: [{ match: { type: 'section' } }],
            should: [{ wildcard: { name: `*${searchName}*` } }],
            minimum_should_match: 1,
          },
        },
      });

      return result.hits.hits.map((item) => item._source) as string[];
    } catch (err) {
      logger.error('Error from elastic.getNameShopByElastic: ', err);
      throw new BadRequestException('Error getting name');
    }
  }
}
