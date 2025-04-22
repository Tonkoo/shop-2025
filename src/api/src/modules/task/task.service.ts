import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ElasticsearchCatalogService } from '../elasticsearch/elasticsearch.catalog.service';

@Injectable()
export class TaskService {
  constructor(private readonly EsServices: ElasticsearchCatalogService) {}
  @Cron(CronExpression.EVERY_MINUTE)
  async reindexElastic() {
    // await this.EsServices.createIndex({ getItems: false });
  }
}
