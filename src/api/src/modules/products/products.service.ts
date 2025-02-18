import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Sections } from '../../entities/sections.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from '../../entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
  ) {}
  async create(data: CreateProductDto) {
    const section = await this.sectionsRepo
      .findOne({
        where: {
          id: data.id_section,
        },
      })
      .catch((err) => {
        console.log(err);
        return null;
      });

    if (!section) throw new NotFoundException('Section not found');
    const product = new Products();
    product.code = data.code;
    product.name = data.name;
    product.images = data.images;
    product.price = data.price;
    product.color = data.color;
    product.description = data.description;
    product.id_section = section.id;
    product.show_on_main = data.show_on_main;
    product.main_slider = data.main_slider;

    const res = await product.save();

    return product;

    return new ProductDto(res);
  }

  async updateById(id: number, data: UpdateProductDto) {
    const section = await this.sectionsRepo
      .findOne({
        where: {
          id: data.id_section,
        },
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    await this.productsRepo
      .update(
        { id: id },
        {
          code: data.code,
          name: data.name,
          images: data.images,
          color: data.color,
          description: data.description,
          id_section: section?.id,
          show_on_main: data.show_on_main,
          main_slider: data.main_slider,
        },
      )
      .catch((err) => {
        console.log(err);
      });

    return 'Успех';
  }
}
