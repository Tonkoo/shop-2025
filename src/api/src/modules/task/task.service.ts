import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';

@Injectable()
export class TaskService {
  constructor(private readonly EsServices: ElasticsearchService) {}
  @Cron(CronExpression.EVERY_MINUTE)
  async reindexElastic() {
    // await this.EsServices.createIndex({ getItems: false });
  }
}
