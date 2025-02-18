import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Products } from '../../entities/products.entity';
import { Sections } from '../../entities/sections.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Sections])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
