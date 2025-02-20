import { HttpStatus, Injectable } from '@nestjs/common';
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
      // Todo Удалять старый индекс
      const products = await this.productRepository.find();
      const sections = await this.sectionsRepository.find();

      const documentsProduct = products.map((product) => ({
        // id: product.id,
        // type: 'product',
        // code: product.code,
        // name: product.name,
        // image: {
        //   alt: '1213',
        //   src: '12312',
        // },
        // price: product.price,
        // color: product.color,
        // description: product.description,
        // id_section: product.id_section,
        // show_on_main: product.show_on_main ? 1 : 0,
        // main_slider: product.main_slider ? 1 : 0,
        // update_at: product.update_at,
        // create_at: product.create_at,
        ...product,
        image: {
          alt: '1213',
          src: '12312',
        },
        type: 'product',
      }));
      const documentsSection = sections.map((sections) => ({
        id: sections.id,
        type: 'section',
        code: sections.code,
        name: sections.name,
        image: {
          alt: '1213',
          src: '12312',
        },
        update_at: sections.update_at,
        create_at: sections.create_at,
        id_parent: '1321',
      }));

      const document = [...documentsProduct, ...documentsSection];

      await this.bulkIndexDocuments('shop', document);

      // console.log(JSON.stringify(document, null, 2), 'dsadsadasdasd');

      // return;
      return ResponseHelper.createResponse(
        HttpStatus.OK,
        { messages: 'Переадресация выполнена' },
        'Successful',
      );
    } catch (err) {
      logger.error('Error adding index: ', err);
      return ResponseHelper.createResponse(
        HttpStatus.BAD_REQUEST,
        { messages: 'Error' },
        'Error',
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
