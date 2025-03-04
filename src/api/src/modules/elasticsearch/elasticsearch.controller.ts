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
  async getSection(
    @Query('type') type: string,
    @Query('from') from: number,
    @Query('size') size: number,
  ) {
    console.log('type:' + type);
    console.log('from:' + from);
    console.log('size:' + size);
    const result = await this.services.getShopByElastic(type, from, size);
    return ResponseHelper.createResponse(HttpStatus.OK, result);
  }
}
