import { Module } from '@nestjs/common';
import { ElasticsearchModule as ESModule } from '@nestjs/elasticsearch';
import { ElasticsearchCatalogService } from './elasticsearch.catalog.service.js';
import { ElasticsearchAdminService } from './elasticsearch.admin.service.js';
import { ElasticController } from './elasticsearch.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './../../entities/products.entity.js';
import { Sections } from './../../entities/sections.entity.js';
import { Images } from './../../entities/images.entity.js';
import { Colors } from './../../entities/colors.entity.js';
import { ElasticsearchMainService } from './elasticsearch.main.service.js';
import { SortingOptions } from './../../entities/sortingOptions.entity.js';

@Module({
  imports: [
    ESModule.registerAsync({
      useFactory: () => ({
        node: process.env.ELASTIC_URL || 'http://localhost:9200',
        auth: {
          username: process.env.ELASTIC_USER || 'elastic',
          password: process.env.ELASTIC_PASSWORD || 'elastic',
        },
      }),
    }),
    TypeOrmModule.forFeature([
      Products,
      Sections,
      Images,
      Colors,
      SortingOptions,
    ]),
  ],
  controllers: [ElasticController],
  providers: [
    ElasticsearchAdminService,
    ElasticsearchCatalogService,
    ElasticsearchMainService,
  ],
  exports: [
    ElasticsearchAdminService,
    ElasticsearchCatalogService,
    ElasticsearchMainService,
  ],
})
export class ElasticsearchModule {}
