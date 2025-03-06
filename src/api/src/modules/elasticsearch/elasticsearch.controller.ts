import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseHelper, ResponseHelperApiOK } from '../../utils/response.util';

@Controller('elastic')
@ApiTags('elastic')
export class ElasticController {
  constructor(private readonly services: ElasticsearchService) {}

  @Get('reindex')
  @ApiOperation({ summary: 'Первичная индексация всех докментов' })
  @ApiBody({
    description: 'Все данные из базы данных отпрпавляются в поисковый индекс',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  async createIndex() {
    await this.services.createIndex();
    return ResponseHelper.createResponse(HttpStatus.OK, {
      messages: 'Переиндексация выполнена',
    });
  }

  @Get('admin')
  async getItems(
    @Query('type') type: string,
    @Query('from') from: number,
    @Query('size') size: number,
    @Query('name') name: string,
  ) {
    const result = await this.services.getShopByElastic(type, from, size, name);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
  @Get('admin/count')
  async getCountColumn(
    @Query('type') type: string,
    @Query('name') name: string,
  ) {
    const result = await this.services.getCountShopByElastic(type, name);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
  @Get('admin/name')
  async getNameItems(@Query('type') type: string) {
    const result = await this.services.getNameShopByElastic(type);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
}
