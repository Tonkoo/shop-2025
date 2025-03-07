import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  HttpStatus,
  Delete,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { SectionsService } from './sections.service';
import { SectionDto } from './dto/section.dto';
import {
  ResponseHelper,
  ResponseHelperApiCreated,
  ResponseHelperApiError,
  ResponseHelperApiOK,
} from '../../utils/response.util';
import { ProductDto } from '../products/dto/product.dto';
import { response } from '../../interfaces/global';
import { Sections } from '../../entities/sections.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { getMulterOptions } from '../../config/multer.config';
import { createImages } from '../../utils/createImages.util';
import { DataSource } from 'typeorm';
import { logger } from '../../utils/logger/logger';
import { transliterate as tr } from 'transliteration';

class DeleteSectionDto {
  @ApiProperty({ example: true, description: 'Признак обновления данных' })
  getSection: boolean;
}

@Controller('section')
@ApiTags('section')
export class SectionsController {
  constructor(
    private readonly services: SectionsService,
    private readonly dataSource: DataSource,
  ) {}

  @ApiOperation({ summary: 'Вывод данных таблицы' })
  @ApiBody({
    description: 'Вывод данных таблицы',
    type: ProductDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка',
    type: ResponseHelperApiError,
  })
  @Get()
  async getList(): Promise<response> {
    const result: Sections[] = await this.services.getList();
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'files', maxCount: 10 }],
      getMulterOptions('section'),
    ),
  )
  @ApiOperation({ summary: 'Создать новый раздел' })
  @ApiBody({
    description: 'Данные для создания нового раздела',
    type: SectionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Успешный ответ',
    type: ResponseHelperApiCreated,
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка',
    type: ResponseHelperApiError,
  })
  async create(
    @Body() data: SectionDto,
    @UploadedFiles() files: { files: Express.Multer.File[] },
  ) {
    const fileData = files.files.map((file) => ({
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
      mimeType: file.mimetype,
    }));
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      data.images = await createImages(fileData, queryRunner);
      data.code = tr(data.name, { replace: { ' ': '-' } });
      const result: Sections | Sections[] = await this.services.create(
        data,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return ResponseHelper.createResponse(HttpStatus.CREATED, result);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      logger.error('Error from sections.save: ', err);
      throw new BadRequestException(
        'An error occurred while saving the partition.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Изменение данных раздела' })
  @ApiBody({
    description: 'Данные для изменения данных раздела',
    type: SectionDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка',
    type: ResponseHelperApiError,
  })
  async updateById(
    @Param('id') id: number,
    @Body() data: SectionDto,
  ): Promise<response> {
    const result: Sections | Sections[] = await this.services.updateById(
      id,
      data,
    );
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление раздела' })
  @ApiBody({
    description: 'Удаление раздела',
    type: DeleteSectionDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  async deleteById(
    @Param('id') id: number,
    @Body() data: SectionDto,
  ): Promise<response> {
    const result: number | Sections[] = await this.services.deleteById(
      id,
      data,
    );
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
}
