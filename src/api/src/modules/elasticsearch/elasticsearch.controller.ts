import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ElasticsearchCatalogService } from './elasticsearch.catalog.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseHelper, ResponseHelperApiOK } from '../../utils/response.util';
import { response, resultItems, SectionElastic } from '../../interfaces/global';
import { payLoad, ParamsCatalog } from './dto/elasticsearch.dto';
import { ElasticsearchAdminService } from './elasticsearch.admin.service';
import { ElasticsearchMainService } from './elasticsearch.main.service';

@Controller('elastic')
@ApiTags('elastic')
export class ElasticController {
  constructor(
    private readonly servicesAdmin: ElasticsearchAdminService,
    private readonly servicesMain: ElasticsearchMainService,
    private readonly servicesCatalog: ElasticsearchCatalogService,
  ) {}

  @Get('reindex')
  @ApiOperation({
    summary: 'Индексация всех документов',
    description: 'Все данные из базы данных отправляются в поисковый индекс',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  async createIndex(@Query() payLoad: payLoad): Promise<response> {
    const result = await this.servicesAdmin.createIndex(payLoad);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
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
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  async getItems(@Query() payLoad: payLoad): Promise<response> {
    const result: resultItems =
      await this.servicesAdmin.getItemsFilter(payLoad);
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
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  async getNameItems(@Query() payLoad: payLoad): Promise<response> {
    const result: SectionElastic[] =
      await this.servicesAdmin.getNameShopByElastic(payLoad);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }

  // TODO: Описать свагер
  @Get('main')
  @ApiOperation({
    summary: 'Получение контента для главной страницы сайта из Elasticsearch',
  })
  @ApiQuery({
    name: 'layout',
    type: String,
    description: 'Признак получения элементов меню',
    example: 'true',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  async getItemMain(@Query('layout') layout: string) {
    const result = await this.servicesMain.getItemMain(layout);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }

  // TODO: Описать свагер
  @Get('catalog')
  @ApiOperation({
    summary: 'Получение контента для главной страницы сайта из Elasticsearch',
  })
  @ApiQuery({
    name: 'url',
    type: String,
    description: 'Ссылка элемента',
    example: '/catalog/muzhskoy/shorty/',
    required: true,
  })
  @ApiQuery({
    name: 'sorting',
    type: String,
    description: 'Признак сортировки',
    example: 'none',
    required: true,
  })
  @ApiQuery({
    name: 'filter',
    type: String,
    description: 'Объект с свойствами фильтрации',
    example: 'none',
    required: true,
  })
  @ApiQuery({
    name: 'layout',
    type: String,
    description: 'Признак получения элементов меню',
    example: 'true',
    required: true,
  })
  @ApiQuery({
    name: 'onlyFilters',
    type: String,
    description: 'Признак получения только фильтров',
    example: 'true',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  async getItemCatalog(@Query() params: ParamsCatalog) {
    const result = await this.servicesCatalog.getItemsCatalog(params);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
}
