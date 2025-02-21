import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Sections } from '../../entities/sections.entity';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sections]), ElasticsearchModule],
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionsModule {}
