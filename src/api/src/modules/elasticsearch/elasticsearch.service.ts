import { Injectable } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';
import { logger } from '../../utils/logger/logger';

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
                code: { type: 'text' },
                name: { type: 'text' },
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
