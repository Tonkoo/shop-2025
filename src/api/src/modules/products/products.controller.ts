import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import {
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
    await this.services.create(data);

    // return this.EsServices.addDocument('product', result.id.toString(), data);
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
  updateById(@Param('id') id: number, @Body() data: ProductDto) {
    return this.services.updateById(id, data);
  }
}
