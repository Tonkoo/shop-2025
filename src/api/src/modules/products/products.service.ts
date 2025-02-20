import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Products } from '../../entities/products.entity';
import { logger } from '../../utils/logger/logger';
import { ResponseHelper } from '../../utils/response.util';
import { prepareData } from '../../utils/prepare.util';

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

      const newData = prepareData(data, ['getProduct']);

      await this.productsRepo.save(newData);

      if (data.getProduct) {
        return await this.getList();
      }
      return newData;

      // return ResponseHelper.createResponse(
      //   HttpStatus.CREATED,
      //   data.getProduct ? await this.getList() : data,
      // );
    } catch (err) {
      logger.error('Error from product.create: ', err);
    }
  }

  async getList() {
    try {
      return await this.productsRepo.find();
    } catch (err) {
      console.log('Error from products.getList: ', err);
    }
  }

  async updateById(id: number, data: ProductDto) {
    try {
      // TODO: передавать только те поля которые пришли в data

      const newData = prepareData(data, ['getProduct']);

      await this.productsRepo.update({ id: id }, newData);
      // throw new NotFoundException();

      if (data.getProduct) {
        return await this.getList();
      }
      return newData;
    } catch (err) {
      // TODO: если exception 404 throw NotFoundException, 400 throw BadRequestExecption
      logger.error('Error from product.update: ', err);
      // throw new BadRequestException(err);
    }
  }
}
