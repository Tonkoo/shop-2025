import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import {
  ResponseHelper,
  ResponseHelperApiCreated,
  ResponseHelperApiError,
  ResponseHelperApiOK,
} from '../../utils/response.util';

@Controller('product')
@ApiTags('product')
export class ProductsController {
  constructor(
    private readonly services: ProductsService,
    private readonly EsServices: ElasticsearchService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый продукт' })
  @ApiBody({
    description: 'Данные для создания нового продукта',
    type: ProductDto,
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
  async create(@Body() data: ProductDto) {
    const result = await this.services.create(data);
    return ResponseHelper.createResponse(HttpStatus.CREATED, result);

    // return this.services.create(data);
    // return this.EsServices.addDocument('product', result.id.toString(), data);
  }

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

  @Put(':id')
  @ApiOperation({ summary: 'Изменение данных продукта' })
  @ApiBody({
    description: 'Данные для изменения данных продукта',
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
  async updateById(@Param('id') id: number, @Body() data: ProductDto) {
    const result = await this.services.updateById(id, data);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
    // return this.services.updateById(id, data);
  }
}
