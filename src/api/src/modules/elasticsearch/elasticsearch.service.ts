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
  SectionElastic,
  ProductElastic,
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

  private getSectionLevel(
    sections: SectionElastic[],
    sectionId: number | string,
  ): number {
    const section = sections.find((s) => s.id === Number(sectionId));
    if (!section) {
      throw new NotFoundException('Not found Section');
    }

    return section?.level;
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
        loadRelationIds: true,
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await this.getItemsFilter(payLoad);
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
    if (documents.length === 0) {
      console.log('No documents to index. Skipping bulk operation.');
      return;
    }

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
    document: ProductClient | SectionClient,
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
      const updatedDocument: any = {
        ...document,
        type,
        images: imageData,
      };

      if (updatedDocument.section && updatedDocument.section.id) {
        updatedDocument.section = updatedDocument.section.id;
        updatedDocument.section = Number(updatedDocument.section);
      }
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
      console.log(document);
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

  getFilter(type: string, name?: string, filterSection?: number): any[] {
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
    if (filterSection) {
      filter.push({
        term: { section: filterSection },
      });
    }

    return filter;
  }

  async getItemsFilter(payLoad: payLoad): Promise<resultItems[]> {
    try {
      const { type, from, size, searchName, filterSection } = payLoad;
      const filter = this.getFilter(type, searchName, filterSection);

      const items = await this.searchFromElastic({
        size,
        from,
        query: {
          bool: {
            filter: filter,
          },
        },
      });
      const total: any = items.hits.total;
      const rawItems = items.hits.hits.map(
        (item) => item._source as SectionElastic | ProductElastic,
      );

      const sectionIds = new Set<number>();
      rawItems.forEach((item) => {
        if ('section' in item && item.section) {
          sectionIds.add(item.section);
        }
        if ('id_parent' in item && item.id_parent) {
          sectionIds.add(item.id_parent);
        }
      });

      const sections = await this.sectionsRepository.find({
        where: { id: In([...sectionIds]) },
      });
      const sectionMap = new Map(sections.map((s) => [s.id, s]));

      const result = rawItems.map((item) => {
        if ('section' in item) {
          return {
            ...item,
            sectionName: item.section
              ? sectionMap.get(item.section)?.name
              : undefined,
          };
        }

        if ('id_parent' in item) {
          return {
            ...item,
            sectionName: item.id_parent
              ? sectionMap.get(item.id_parent)?.name
              : undefined,
          };
        }

        return item;
      });

      return formatResults(result, total);
    } catch (err) {
      logger.error('Error from elastic.getShopByElastic: ', err);
      throw new BadRequestException('Error while receiving data');
    }
  }

  async getNameShopByElastic(payLoad: payLoad): Promise<SectionElastic[]> {
    const { type, searchName, size } = payLoad;
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

      return testResult.map((section) => {
        const level = this.getSectionLevel(testResult, section.id);
        return {
          ...section,
          name: '.'.repeat(level) + section.name,
        };
      });
    } catch (err) {
      logger.error('Error from elastic.getNameShopByElastic: ', err);
      throw new BadRequestException('Error getting name');
    }
  }
}
