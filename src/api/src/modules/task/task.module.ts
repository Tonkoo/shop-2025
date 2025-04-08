import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';

@Module({
  imports: [ScheduleModule.forRoot(), ElasticsearchModule],
  providers: [TaskService],
})
export class TaskModule {}
