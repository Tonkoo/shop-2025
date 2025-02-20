import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { Repository } from 'typeorm';
import { logger } from '../../utils/logger/logger';
import { ResponseHelper } from '../../utils/response.util';
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
      const newData = prepareData(data, ['getSections']);
      await this.sectionsRepo.save(newData);

      if (data.getSections) {
        return await this.getList();
      }
      return newData;
    } catch (err) {
      logger.error('Error from sections.create: ', err);
      // TODO: Exception
    }
  }

  async getList() {
    try {
      const sections = await this.sectionsRepo.find();
      return sections;
    } catch (err) {
      console.log('Error for sections.getList: ', err);
    }
  }

  // async getListForClient() {
  //   // TODO: обернуть в try catch
  //   const list = await this.getList();
  //
  //   if (!list) {
  //     // TODO: exeption с 404 ошибкой
  //   }
  //
  //   return ResponseHelper.createResponse(HttpStatus.OK, list);
  // }

  async updateById(id: number, data: SectionDto) {
    try {
      {
        const newData = prepareData(data, ['getSections']);
        await this.sectionsRepo.update({ id: id }, newData);

        if (data.getSections) {
          return await this.getList();
        }
        return newData;
      }
    } catch (err) {
      logger.error('Error from sections.update : ', err);
    }
  }
}
