import { Module } from '@nestjs/common';
import { TodoController } from './controllers/todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { admins } from './Entities/admins.entity';
import { images } from './Entities/images.entity';
import { products } from './Entities/products.entity';
import { sections } from './Entities/sections.entity';

@Module({
  controllers: [TodoController],
  imports: [TypeOrmModule.forFeature([admins, images, products, sections])],
  providers: [],
})
export class TodoModule {}
