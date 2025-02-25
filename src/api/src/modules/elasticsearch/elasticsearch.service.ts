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

  async generateBlockImages(data: any[], type: string) {
    return await Promise.all(
      data.map(async (product) => {
        const imageIds: any = product.images;
        const images = await this.imagesRepository.findByIds(imageIds);

        const imageData = images.map((image) => ({
          alt: image.name,
          src: image.path,
        }));

        return {
          ...product,
          images: imageData,
          type: type,
        };
      }),
    );
  }

  async createIndex() {
    try {
      await this.elasticsearchService.indices.delete({ index: this.index });
    } catch {
      console.log('No index');
    }
    try {
      const products = await this.productRepository.find();
      const sections = await this.sectionsRepository.find();

      const documentsProduct: any = await this.generateBlockImages(
        products,
        'product',
      );
      const documentsSection: any = await this.generateBlockImages(
        sections,
        'section',
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

  async addDocument(index: string, id: string, document: any, type: any) {
    try {
      console.log(document);
      const imageIds = document.images;
      const images = await this.imagesRepository.findByIds(imageIds);
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
      console.log(documnet);

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
}
