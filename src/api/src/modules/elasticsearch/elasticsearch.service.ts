import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';
import { logger } from '../../utils/logger/logger';
import { In, Repository } from 'typeorm';
import { Products } from '../../entities/products.entity';
import { Sections } from '../../entities/sections.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from '../../entities/images.entity';
import * as process from 'node:process';

interface Document {
  id?: string | number; // id теперь необязательное поле
  images: { alt: string; src: string }[];
  type: string;
}

interface ElasticsearchResponse {
  hits: {
    total?:
      | {
          value: number;
          relation: string;
        }
      | number;
    hits: Array<{
      _source: any;
    }>;
  };
}

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
  private readonly index = process.env.ELASTIC_INDEX;

  async generateBlockImages(data: { images: string[] }[], type: string) {
    return await Promise.all(
      data.map(async (data) => {
        if (!Array.isArray(data.images)) {
          throw new BadRequestException('Invalid images format');
        }
        const imageIds = data.images;
        const images = await this.imagesRepository.findBy({ id: In(imageIds) });

        const imageData = images.map((image) => ({
          alt: image.name,
          src: image.path,
        }));

        return {
          ...data,
          images: imageData,
          type: type,
        };
      }),
    );
  }

  async createIndex() {
    try {
      await this.elasticsearchService.indices.delete({
        index: this.index || 'shop',
      });
    } catch {
      console.log('No index');
    }
    try {
      const products = await this.productRepository.find();
      const sections = await this.sectionsRepository.find();

      const documentsProduct = await this.generateBlockImages(
        products.map((p) => ({ ...p, images: p.images.map(String) })),
        'product',
      );

      const documentsSection = await this.generateBlockImages(
        sections.map((s) => ({ ...s, images: s.images.map(String) })),
        'section',
      );

      const document = [...documentsProduct, ...documentsSection];

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
    documents: Document[],
  ): Promise<void> {
    const body = documents.flatMap((doc) => [
      { index: { _index: index, _id: doc.id } },
      doc,
    ]);

    await this.elasticsearchService.bulk({ body });
  }

  async addDocument(
    index: string,
    id: string,
    document: { images: number[]; [key: string]: any },
    type: string,
  ) {
    try {
      const imageIds: number[] = document.images;
      const images = await this.imagesRepository.findBy({
        id: In(imageIds),
      });
      const imageData = images.map((image) => ({
        alt: image.name,
        src: image.path,
      }));
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

  async updateDocument(index: string, id: string, documnet: any, type: string) {
    try {
      await this.deleteDocument(index, id);

      return await this.addDocument(index, id, documnet, type);
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

  async getShopByElastic(
    type: string,
    from: number,
    size: number,
    name?: string,
  ) {
    const mustConditions: any[] = [];
    if (name) {
      mustConditions.push({
        term: { name: name },
      });
    }

    mustConditions.push({
      term: { type: type },
    });
    const result = await this.elasticsearchService.search({
      index: process.env.ELASTIC_INDEX,
      body: {
        query: {
          bool: {
            must: mustConditions,
          },
        },
        from: from,
        size: size,
      },
    });

    return result.hits.hits.map((item) => item._source);
  }

  async getCountShopByElastic(type: string, name: string) {
    const mustConditions: any[] = [];
    if (name) {
      mustConditions.push({
        term: { name: name },
      });
    }

    mustConditions.push({
      term: { type: type },
    });
    const result =
      await this.elasticsearchService.search<ElasticsearchResponse>({
        index: process.env.ELASTIC_INDEX,
        body: {
          query: {
            bool: {
              must: mustConditions,
            },
          },
          size: 0,
        },
      });

    const total = result.hits.total;

    if (typeof total === 'object' && total !== null && 'value' in total) {
      return total.value;
    }
  }

  async getNameShopByElastic(type: string) {
    const result = await this.elasticsearchService.search({
      index: process.env.ELASTIC_INDEX,
      body: {
        _source: ['name'],
        query: {
          match: {
            type: type,
          },
        },
        size: 1000,
      },
    });
    return result.hits.hits.map((item) => item._source);
  }
}
