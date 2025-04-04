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
  Query,
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
import { SectionBase, response, resultItems } from '../../interfaces/global';
import { Sections } from '../../entities/sections.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { getMulterOptions } from '../../config/multer.config';
import { UpdateResult } from 'typeorm';
import { logger } from '../../utils/logger/logger';

class DeleteSectionDto {
  @ApiProperty({ example: true, description: 'Признак обновления данных' })
  getSection: boolean;
}

@Controller('section')
@ApiTags('section')
export class SectionsController {
  constructor(private readonly services: SectionsService) {}

  @ApiOperation({ summary: 'Получение раздела по идентификатору' })
  @ApiBody({
    description: 'Получение раздела по идентификатору',
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
  @Get('/id')
  async getSectionById(@Query('id') id: number): Promise<response> {
    const result: SectionBase | SectionBase[] =
      await this.services.getSectionById(id);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }

  @ApiOperation({ summary: 'Получение раздела по названию' })
  @ApiBody({
    description: 'Получение раздела по названию',
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
  @Get('/name')
  async getSectionByName(@Query('name') name: string): Promise<response> {
    const result: SectionBase | SectionBase[] =
      await this.services.getSectionByName(name);
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
  ): Promise<response> {
    try {
      const result: Sections | resultItems = await this.services.create(
        data,
        files,
      );
      return ResponseHelper.createResponse(HttpStatus.CREATED, result);
    } catch (err) {
      logger.error('Error from sections.save: ', err);
      throw new BadRequestException(
        'An error occurred while saving the partition.',
      );
    }
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'files', maxCount: 10 }],
      getMulterOptions('section'),
    ),
  )
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
    @UploadedFiles() files: { files: Express.Multer.File[] },
  ): Promise<response> {
    try {
      const result: resultItems | UpdateResult = await this.services.updateById(
        id,
        data,
        files,
      );
      return ResponseHelper.createResponse(HttpStatus.OK, result);
    } catch (err) {
      logger.error('Error from sections.update: ', err);
      throw err;
    }
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
    @Query() data: SectionDto,
  ): Promise<response> {
    const result: resultItems | number = await this.services.deleteById(
      id,
      data,
    );
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
}
