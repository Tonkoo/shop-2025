import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { logger } from '../../utils/logger/logger';
import { SectionDto } from './dto/section.dto';
import { prepareData } from '../../utils/prepare.util';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
  ) {}
  async create(data: SectionDto) {
    try {
      const newData = prepareData(data, ['getSection']);
      await this.sectionsRepo.save(newData);

      if (data.getSection) {
        return await this.getList();
      }
      return newData;
    } catch (err) {
      logger.error('Error from sections.create: ', err);
      if (err instanceof QueryFailedError) {
        // @ts-ignore
        switch (err.code) {
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
        'An error occurred while creating the section.',
      );
    }
  }

  async getList() {
    try {
      const sections = await this.sectionsRepo.find();

      if (!sections) throw new NotFoundException('Section not found');

      return sections;
    } catch (err) {
      console.log('Error for sections.getList: ', err);
      throw err;
    }
  }

  async updateById(id: number, data: SectionDto) {
    try {
      {
        const newData = prepareData(data, ['getSection']);
        await this.sectionsRepo.update({ id: id }, newData);

        if (data.getSection) {
          return await this.getList();
        }
        return newData;
      }
    } catch (err) {
      logger.error('Error from sections.update : ', err);
      if (err instanceof QueryFailedError) {
        // @ts-ignore
        switch (err.code) {
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
        'An error occurred while updating the section.',
      );
    }
  }
  async deleteById(id: number, data: SectionDto) {
    try {
      await this.sectionsRepo.delete(id);

      if (data.getSection) {
        return await this.getList();
      }

      return id;
    } catch (err) {
      logger.error('Error from sections.delete : ', err);
      throw new BadRequestException(
        'An error occurred while updating the section.',
      );
    }
  }
}
