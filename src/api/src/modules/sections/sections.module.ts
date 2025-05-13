import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsService } from './sections.service.js';
import { SectionsController } from './sections.controller.js';
import { Sections } from './../../entities/sections.entity.js';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module.js';
import { Images } from './../../entities/images.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Sections, Images]), ElasticsearchModule],
  controllers: [SectionsController],
  providers: [SectionsService],
})
export class SectionsModule {}
