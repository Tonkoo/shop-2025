import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';
import { logger } from './../../utils/logger/logger.js';
import { ProductElastic } from '@interfaces/adminGlobal.js';

import { formatMainContent } from './../../utils/formatResults.util.js';
import { searchFromElastic } from './../../utils/searchFromElastic.util.js';
import { getLayout } from './../../utils/getLayout.util.js';

@Injectable()
export class ElasticsearchMainService {
  constructor(private readonly elasticsearchService: ESClient) {}

  /**
   * Получает данные из ElasticSearch для главной страницы
   * @param layout
   */
  async getItemMain(layout: boolean) {
    try {
      const items = await searchFromElastic(
        {
          source: [
            'name',
            'code',
            'price',
            'show_on_main',
            'main_slider',
            'hexColor',
            'url',
            'images',
          ],
          query: {
            bool: {
              should: [
                { term: { show_on_main: 'true' } },
                { term: { main_slider: 'true' } },
              ],
              minimum_should_match: 1,
            },
          },
        },
        this.elasticsearchService,
      );

      return formatMainContent(
        items.items as ProductElastic[],
        layout ? await getLayout(this.elasticsearchService) : null,
      );
    } catch (err) {
      logger.error('Error from elastic.getItemMain: ', err);
      throw new BadRequestException('Error getting main page items');
    }
  }
}
