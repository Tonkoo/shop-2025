import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { Repository } from 'typeorm';
import { logger } from '../../utils/logger/logger';
import { ResponseHelper } from '../../utils/response.util';
import { SectionDto } from './dto/section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
  ) {}
  async create(data: SectionDto) {
    try {
      await this.sectionsRepo.save({
        code: data.code,
        name: data.name,
        images: data.images,
        id_parent: data.idParent,
      });

      return ResponseHelper.createResponse(
        HttpStatus.CREATED,
        data,
        'Successfully',
      );
    } catch (err) {
      logger.error('Error adding section: ', err);
      return ResponseHelper.createResponse(
        HttpStatus.BAD_REQUEST,
        data,
        'Error',
      );
    }
  }

  async updateById(id: number, data: SectionDto) {
    try {
      {
        await this.sectionsRepo.update(
          { id: id },
          {
            code: data.code,
            name: data.name,
            images: data.images,
            id_parent: data.idParent,
          },
        );
        return ResponseHelper.createResponse(
          HttpStatus.OK,
          data,
          'Successfully',
        );
      }
    } catch (err) {
      logger.error('Error updating section: ', err);
      return ResponseHelper.createResponse(
        HttpStatus.BAD_REQUEST,
        data,
        'Error',
      );
    }
  }
}
