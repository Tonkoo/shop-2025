import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { SectionsService } from './sections.service';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { SectionDto } from './dto/section.dto';
import {
  ResponseHelper,
  ResponseHelperApiCreated,
  ResponseHelperApiError,
  ResponseHelperApiOK,
} from '../../utils/response.util';
import { ProductDto } from '../products/dto/product.dto';

class DeleteSectionDto {
  @ApiProperty({ example: true, description: 'Признак обновления данных' })
  getSection: boolean;
}

@Controller('section')
@ApiTags('section')
export class SectionsController {
  constructor(
    private readonly services: SectionsService,
    private readonly EsServices: ElasticsearchService,
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
  async getList() {
    const result = await this.services.getList();
    return ResponseHelper.createResponse(HttpStatus.OK, result);
    // return this.services.getList();
  }
  @Post()
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
  async create(@Body() data) {
    const result = await this.services.saveSection(data);
    // await this.EsServices.createIndex();
    return ResponseHelper.createResponse(HttpStatus.CREATED, result);
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
  async updateById(@Param('id') id: number, @Body() data: SectionDto) {
    const result = await this.services.updateById(id, data);
    await this.EsServices.createIndex();
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
  async deleteById(@Param('id') id: number, @Body() data: SectionDto) {
    const result = await this.services.deleteById(id, data);
    await this.EsServices.createIndex();
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
}
