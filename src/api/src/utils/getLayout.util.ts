import { mainLayout, SectionElastic } from '../interfaces/global';
import { searchFromElastic } from './searchFromElastic.util';
import { logger } from './logger/logger';
import { BadRequestException } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';

export async function getLayout(
  elasticsearchService: ESClient,
): Promise<mainLayout> {
  try {
    const layout = await searchFromElastic(
      {
        query: { bool: { must: { term: { type: 'section' } } } },
      },
      elasticsearchService,
    );

    const menu = layout.items as SectionElastic[];
    // TODO: убрать запрос использовать для формирования меню level
    const resultMenu: SectionElastic[] = await Promise.all(
      menu.map(async (item) => {
        if (!item.id_parent) {
          const sections = await searchFromElastic(
            {
              query: {
                bool: {
                  must: [
                    { term: { type: 'section' } },
                    { term: { id_parent: item.id } },
                  ],
                },
              },
            },
            elasticsearchService,
          );
          return {
            ...item,
            items: sections.items as SectionElastic[],
          };
        }
        return item;
      }),
    );

    return {
      menu: resultMenu,
    };
  } catch (err) {
    logger.error('Error from elastic.getLayout: ', err);
    throw new BadRequestException('Error getting menu items');
  }
}
