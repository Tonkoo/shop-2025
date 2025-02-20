import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/sections.entity';
import { Repository } from 'typeorm';
import { logger } from '../../utils/logger/logger';
import { ResponseHelper } from '../../utils/response.util';
import { SectionDto } from './dto/section.dto';
// import { prepareData } from '../../utils/prepare.util';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Sections)
    private readonly sectionsRepo: Repository<Sections>,
  ) {}
  async create(data: SectionDto) {
    try {
      console.log(data.idParent);
      // const newData = prepareData(data, ['getSections']);
      // await this.sectionsRepo.save(newData);
      await this.sectionsRepo.save({
        code: data.code,
        name: data.name,
        images: data.images,
        id_parent: data.idParent,
      });

      return ResponseHelper.createResponse(
        HttpStatus.CREATED,
        data.getSections ? await this.getList() : data,
        'Successfully',
      );
    } catch (err) {
      logger.error('Error from sections.create: ', err);
      // TODO: Exception
      return ResponseHelper.createResponse(
        HttpStatus.BAD_REQUEST,
        data,
        'Error',
      );
    }
  }

  async getList() {
    const sections = await this.sectionsRepo.find();

    return sections.map((item) => new SectionDto(item));
  }

  async getListForClient() {
    // TODO: обернуть в try catch
    const list = await this.getList();

    if (!list) {
      // TODO: exeption с 404 ошибкой
    }

    return ResponseHelper.createResponse(HttpStatus.OK, list, 'Successfully');
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

        if (data.getSections) {
          return await this.getList();
        }

        return true;
        // return ResponseHelper.createResponse(
        //   HttpStatus.OK,
        //   data.getSections ? await this.getList() : data,
        //   'Successfully',
        // );
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
