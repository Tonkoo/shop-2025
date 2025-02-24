import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';
import { logger } from '../../utils/logger/logger';
import { Repository } from 'typeorm';
import { Products } from '../../entities/products.entity';
import { Sections } from '../../entities/sections.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from '../../entities/images.entity';

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

      const documentsProduct = await Promise.all(
        products.map(async (product) => {
          const imageIds = product.images;
          const images = await this.imagesRepository.findByIds(imageIds);

          const imageData = images.map((image) => ({
            alt: image.name,
            src: image.path,
          }));

          return {
            ...product,
            images: imageData,
            type: 'product',
          };
        }),
      );
      const documentsSection = await Promise.all(
        sections.map(async (section) => {
          const imageIds = section.images;
          const images = await this.imagesRepository.findByIds(imageIds);

          const imageData = images.map((image) => ({
            alt: image.name,
            src: image.path,
          }));

          return {
            ...section,
            images: imageData,
            type: 'section',
          };
        }),
      );

      const document = [...documentsProduct, ...documentsSection];

      await this.bulkIndexDocuments(this.index, document);
      return true;
    } catch (err) {
      logger.error('Error from elastic.createIndex: ', err);
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

  async addDocument(index: string, id: string, documnet: any, type: any) {
    try {
      const result = await this.elasticsearchService.index({
        index: index,
        id: id,
        body: {
          ...documnet,
          type,
          images: {
            alt: '1213',
            src: '12312',
          },
        },
      });
      return result;
    } catch (err) {
      logger.error('Error from elastic.addDocument: ', err);
      throw new BadRequestException('Error adding document');
    }
  }
  async updateDocument(index: string, id: string, documnet: any, type: string) {
    try {
      await this.elasticsearchService.delete({
        index: index,
        id: id,
      });
      console.log(documnet);

      const result = await this.addDocument(index, id, documnet, type);
      return result;
    } catch (err) {
      logger.error('Error from elastic.updateDocument: ', err);
      throw new BadRequestException('Error updating document');
    }
  }
}
