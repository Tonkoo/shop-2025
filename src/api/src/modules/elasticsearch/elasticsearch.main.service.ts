import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';
import { logger } from '../../utils/logger/logger';
import { ProductElastic } from '../../interfaces/global';

import { formatMainContent } from '../../utils/formatResults.util';
import { searchFromElastic } from '../../utils/searchFromElastic.util';
import { getLayout } from '../../utils/getLayout.util';

@Injectable()
export class ElasticsearchMainService {
  constructor(private readonly elasticsearchService: ESClient) {}

  /**
   * Получает данные из ElasticSearch для главной страницы
   * @param layout
   */
  async getItemMain(layout: string) {
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

      // TODO: layout boolean
      return formatMainContent(
        items.items as ProductElastic[],
        layout === 'true' ? await getLayout(this.elasticsearchService) : null,
      );
    } catch (err) {
      logger.error('Error from elastic.getItemMain: ', err);
      throw new BadRequestException('Error getting main page items');
    }
  }
}
