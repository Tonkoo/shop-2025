import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Products } from '../../entities/products.entity';
import { Sections } from '../../entities/sections.entity';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { Images } from '../../entities/images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Sections, Images]),
    ElasticsearchModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
