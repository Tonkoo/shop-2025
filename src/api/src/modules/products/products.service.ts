import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Products } from '../../entities/products.entity';
import { logger } from '../../utils/logger/logger';
import { ResponseHelper } from '../../utils/response.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
  ) {}
  async create(data: ProductDto) {
    try {
      const section = await this.sectionsRepo
        .findOne({
          where: {
            id: data.idSection,
          },
        })
        .catch(() => {
          return null;
        });

      if (!section) throw new NotFoundException('Section not found');

      await this.productsRepo.save({
        code: data.code,
        name: data.name,
        images: data.images,
        price: data.price,
        color: data.color,
        description: data.description,
        id_section: section.id,
        show_on_main: data.showOnMain,
        main_slider: data.mainSlider,
      });

      return ResponseHelper.createResponse(
        HttpStatus.CREATED,
        data.getProduct ? await this.getList() : data,
        'Successfully',
      );
    } catch (err) {
      logger.error('Error adding product: ', err);
      return ResponseHelper.createResponse(
        HttpStatus.BAD_REQUEST,
        data,
        'Error',
      );
    }
  }

  async getList() {
    const products = await this.productsRepo.find();

    return products.map((item) => new ProductDto(item));
  }

  async updateById(id: number, data: ProductDto) {
    try {
      const section = await this.sectionsRepo.findOne({
        where: {
          id: data.idSection,
        },
      });
      await this.productsRepo.update(
        { id: id },
        {
          code: data.code,
          name: data.name,
          images: data.images,
          color: data.color,
          description: data.description,
          id_section: section?.id,
          show_on_main: data.showOnMain,
          main_slider: data.mainSlider,
        },
      );
      return ResponseHelper.createResponse(
        HttpStatus.OK,
        data.getProduct ? await this.getList() : data,
        'Successfully',
      );
    } catch (err) {
      logger.error('Error updating product: ', err);
      return ResponseHelper.createResponse(
        HttpStatus.BAD_REQUEST,
        data,
        'Error',
      );
    }
  }
}
