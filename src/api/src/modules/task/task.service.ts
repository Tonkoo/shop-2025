import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ElasticsearchAdminService } from './../elasticsearch/elasticsearch.admin.service';

@Injectable()
export class TaskService {
  constructor(private readonly EsServices: ElasticsearchAdminService) {}
  @Cron(CronExpression.EVERY_MINUTE)
  async reindexElastic() {
    await this.EsServices.createIndex({ getItems: false });
  }
}
