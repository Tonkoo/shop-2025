import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Sections } from '../../entities/sections.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
  ) {}
  async create(data: CreateProductDto) {
    const section = new Sections();
    section.name = data.name;
    section.code = data.code;
    section.images = data.images;
    section.id_parent = data.id_parent;

    const res = await section.save();

    return section;

    return new ProductDto(res);
  }
}
