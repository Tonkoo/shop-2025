import { Injectable } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';
import { logger } from '../../utils/logger/logger';
import any = jasmine.any;

@Injectable()
export class ElasticsearchService {
  constructor(private readonly elasticsearchService: ESClient) {}

  async createIndex(index: string) {
    try {
      const exists = await this.elasticsearchService.indices.exists({ index });

      if (!exists) {
        return this.elasticsearchService.indices.create({
          index,
          body: {
            mappings: {
              properties: {
                type: { type: 'keyword' },
                id: { type: 'integer' },
                code: { type: 'text' },
                name: { type: 'text' },
                image: {
                  type: 'object',
                  properties: {
                    alt: { type: 'text' },
                    src: { type: 'text' },
                  },
                },
                price: { type: 'float' },
                color: { type: 'text' },
                description: { type: 'text' },
                id_section: { type: 'integer' },
                show_on_main: { type: 'boolean' },
                main_slider: { type: 'boolean' },
                update_at: { type: 'date' },
                create_at: { type: 'date' },
                id_parent: { type: 'integer' },
              },
            },
          },
        });
      }
    } catch (err) {
      logger.error('Error adding index: ', err);
    }
  }

  async addDocument(index: string, id: string, documnet: any) {
    return this.elasticsearchService.index({
      index,
      id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: documnet,
    });
  }
}
