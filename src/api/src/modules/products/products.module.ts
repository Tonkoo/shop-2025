import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Products } from '../../entities/products.entity';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { Images } from '../../entities/images.entity';
import { Colors } from '../../entities/colors.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Images, Colors]),
    ElasticsearchModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
