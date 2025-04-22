import { Module } from '@nestjs/common';
import { ElasticsearchModule as ESModule } from '@nestjs/elasticsearch';
import { ElasticsearchCatalogService } from './elasticsearch.catalog.service';
import { ElasticsearchAdminService } from './elasticsearch.admin.service';
import { ElasticController } from './elasticsearch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../../entities/products.entity';
import { Sections } from '../../entities/sections.entity';
import { Images } from '../../entities/images.entity';
import { Colors } from '../../entities/colors.entity';
import { ElasticsearchMainService } from './elasticsearch.main.service';

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
    TypeOrmModule.forFeature([Products, Sections, Images, Colors]),
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
