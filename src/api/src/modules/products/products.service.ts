import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Products } from '../../entities/products.entity';
import { logger } from '../../utils/logger/logger';

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
    } catch (err) {
      logger.error('Error from product.create: ', err);
      if (err instanceof QueryFailedError) {
        // @ts-ignore
        switch (err.code) {
          case '23503':
            throw new BadRequestException(
              'Invalid reference: Related entity does not exist.',
            );
          case '23502':
            throw new BadRequestException('Missing required field.');
          case '42601':
            throw new InternalServerErrorException(
              'There is an error in the database query syntax.',
            );
          default:
            throw err;
        }
      }

      throw new BadRequestException(
        'An error occurred while creating the product.',
      );
    }
  }

  async getList() {
    try {
      const products = await this.productsRepo.find();

      if (!products) throw new NotFoundException('Products not found');

      return products;
    } catch (err) {
      console.log('Error from products.getList: ', err);
      throw err;
    }
  }

  async updateById(id: number, data: ProductDto) {
    try {
      // TODO: передавать только те поля которые пришли в data

      const newData = prepareData(data, ['getProduct']);

      await this.productsRepo.update({ id: id }, newData);

      if (data.getProduct) {
        return await this.getList();
      }
      return newData;
    } catch (err) {
      // TODO: если exception 404 throw NotFoundException, 400 throw BadRequestExecption
      logger.error('Error from product.update: ', err);
      if (err instanceof QueryFailedError) {
        // @ts-ignore
        switch (err.code) {
          case '23503':
            throw new BadRequestException(
              'Invalid reference: Related entity does not exist.',
            );
          case '23505':
            throw new BadRequestException(
              'Duplicate entry: This value already exists.',
            );
          case '23502':
            throw new BadRequestException('Missing required field.');
          default:
            throw err;
        }
      }

      throw new BadRequestException(
        'An error occurred while updating the product.',
      );
    }
  }
}
