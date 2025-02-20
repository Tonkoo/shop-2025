import { Controller, Get, Param } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseHelperApiOK } from '../../utils/response.util';

@Controller('reindex')
@ApiTags('elastic')
export class ElasticController {
  constructor(private readonly services: ElasticsearchService) {}

  @Get()
  @ApiOperation({ summary: 'Первичная индексация всех докментов' })
  @ApiBody({
    description: 'Все данные из базы данных отпрпавляются в поисковый индекс',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: ResponseHelperApiOK,
  })
  async createIndex(@Param() index: string) {
    return await this.services.createIndex();
  }
}
