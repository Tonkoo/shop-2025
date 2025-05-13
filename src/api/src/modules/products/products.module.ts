import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { Products } from './../../entities/products.entity.js';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module.js';
import { Images } from './../../entities/images.entity.js';
import { Colors } from './../../entities/colors.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Images, Colors]),
    ElasticsearchModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
