import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';
import { logger } from '../../utils/logger/logger';
import { Repository } from 'typeorm';
import { Products } from '../../entities/products.entity';
import { Sections } from '../../entities/sections.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHelper } from '../../utils/response.util';

@Injectable()
export class ElasticsearchService {
  constructor(
    private readonly elasticsearchService: ESClient,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(Sections)
    private readonly sectionsRepository: Repository<Sections>,
  ) {}
  private readonly index = 'shop';

  async createIndex() {
    try {
      await this.elasticsearchService.indices.delete({ index: this.index });
    } catch {
      console.log('No index');
    }
    try {
      const products = await this.productRepository.find();
      const sections = await this.sectionsRepository.find();

      const documentsProduct = products.map((product) => ({
        ...product,
        image: {
          alt: '1213',
          src: '12312',
        },
        type: 'product',
      }));
      const documentsSection = sections.map((sections) => ({
        ...sections,
        type: 'section',
        image: {
          alt: '1213',
          src: '12312',
        },
      }));

      const document = [...documentsProduct, ...documentsSection];

      await this.bulkIndexDocuments(this.index, document);
      return true;
    } catch (err) {
      logger.error('Error adding index: ', err);
      throw new BadRequestException(
        'An error occurred while accepting document indexing.',
      );
    }
  }

  async bulkIndexDocuments(index: string, documents: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const body = documents.flatMap((doc) => [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      { index: { _index: index, _id: doc.id } },
      doc,
    ]);

    return this.elasticsearchService.bulk({
      body,
    });
  }

  // async addDocument(index: string, id: string, documnet: any) {
  //   return this.elasticsearchService.index({
  //     index,
  //     id,
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     body: documnet,
  //   });
  // }
}
