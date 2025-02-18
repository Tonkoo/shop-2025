import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Sections } from '../../entities/sections.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sections])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
