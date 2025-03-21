import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseHelper, ResponseHelperApiOK } from '../../utils/response.util';
import { response, resultItems, SectionElastic } from '../../interfaces/global';
import { payLoad } from './dto/elasticsearch.dto';
@Controller('elastic')
@ApiTags('elastic')
export class ElasticController {
  constructor(private readonly services: ElasticsearchService) {}

  @Get('reindex')
  @ApiOperation({
    summary: 'Первичная индексация всех документов',
    description: 'Все данные из базы данных отправляются в поисковый индекс',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  async createIndex(): Promise<response> {
    await this.services.createIndex();
    return ResponseHelper.createResponse(HttpStatus.OK, {
      messages: 'Пере индексация выполнена',
    });
  }

  @Get('admin')
  @ApiOperation({
    summary: 'Получение данных из Elasticsearch',
  })
  @ApiQuery({
    name: 'type',
    type: String,
    description:
      'Тип документа, который нужно получить (например, "section" или "product").',
    example: 'product',
    required: true,
  })
  @ApiQuery({
    name: 'from',
    type: Number,
    description: 'Смещение для пагинации (начальный индекс).',
    example: 0,
    required: true,
  })
  @ApiQuery({
    name: 'size',
    type: Number,
    description: 'Количество документов, возвращаемых на странице.',
    example: 10,
    required: true,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'Опциональный фильтр по имени документа.',
    example: 'Laptop',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ с массивом документов.',
    type: ResponseHelperApiOK,
  })
  async getItems(@Query() payLoad: payLoad): Promise<response> {
    const result: resultItems[] = await this.services.getItemsFilter(payLoad);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }

  @Get('admin/name')
  @ApiOperation({
    summary: 'Получение списка названий документов из Elasticsearch',
  })
  @ApiQuery({
    name: 'type',
    type: String,
    description:
      'Тип документа, названия которого нужно получить (например, "section" или "product").',
    example: 'product',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ с массивом названий документов.',
    type: ResponseHelperApiOK,
  })
  async getNameItems(@Query() payLoad: payLoad): Promise<response> {
    const result: SectionElastic[] =
      await this.services.getNameShopByElastic(payLoad);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
}
