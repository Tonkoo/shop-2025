import { Controller, Param, Post } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

@Controller('elastic')
export class ElasticController {
  constructor(private readonly services: ElasticsearchService) {}

  @Post('create-index/:index')
  async createIndex(@Param('index') index: string) {
    return this.services.createIndex(index);
  }
}
