import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service.js';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module.js';

@Module({
  imports: [ScheduleModule.forRoot(), ElasticsearchModule],
  providers: [TaskService],
})
export class TaskModule {}
