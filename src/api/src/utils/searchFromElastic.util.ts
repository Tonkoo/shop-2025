import {
  PayLoadTest,
  ProductElastic,
  SectionElastic,
} from '../interfaces/adminGlobal';
import { AggregationsFilter } from '../interfaces/catalogGlobal';
import { ElasticsearchResponse } from '../interfaces/responseGlobal';
import { NotFoundException } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';

/**
 * Выполняет поиск в ElasticSearch и возвращает форматированный результат
 * @param payLoad
 * @param elasticsearchService
 */
export async function searchFromElastic(
  payLoad: PayLoadTest,
  elasticsearchService: ESClient,
) {
  const { query, from, size, source, sort, aggregations } = payLoad;
  const items = await elasticsearchService.search({
    index: process.env.ELASTIC_INDEX,
    body: {
      _source: source,
      query,
      from,
      size,
      sort,
      aggregations,
    },
  });

  if (!items?.hits?.hits) {
    throw new NotFoundException('Not found items');
  }

  const result: ElasticsearchResponse = {
    total: items.hits.total as { value: number },
    items: items.hits.hits.map(
      (item) => item._source as SectionElastic | ProductElastic,
    ),
  };

  if (aggregations) {
    const aggs = items.aggregations as AggregationsFilter;
    result.aggregations = {
      price: {
        min: aggs.price.min,
        max: aggs.price.max,
      },
      color: aggs.color.buckets.map((item) => item.key),
    };
  }
  return result;
}
