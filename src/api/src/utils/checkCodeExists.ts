import { searchFromElastic } from './searchFromElastic.util';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch/dist/elasticsearch.service';
import { BadRequestException } from '@nestjs/common';

/**
 * Проверяет существование записи по code
 * @param code
 * @param elasticsearchService
 */
export async function checkCodeExists(
  code: string,
  elasticsearchService: ESClient,
) {
  const checkCode = await searchFromElastic(
    {
      query: { bool: { must: [{ match: { code: code } }] } },
    },
    elasticsearchService,
  );

  if (checkCode.total.value > 0) {
    throw new BadRequestException('This entry already exists');
  }
}
