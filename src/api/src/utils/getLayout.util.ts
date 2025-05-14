import { SectionElastic } from './../interfaces/adminGlobal.js';
import { MainLayout } from './../interfaces/mainGlobal.js';
import { searchFromElastic } from './searchFromElastic.util.js';
import { logger } from './logger/logger.js';
import { BadRequestException } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';

/**
 * Возвращает данные для меню(Sidebar, Footer)
 * @param elasticsearchService
 */
export async function getLayout(
  elasticsearchService: ESClient,
): Promise<MainLayout> {
  try {
    const layout = await searchFromElastic(
      {
        source: ['id', 'name', 'level', 'url', 'id_parent'],
        query: { bool: { must: { term: { type: 'section' } } } },
      },
      elasticsearchService,
    );
    const menu = layout.items as SectionElastic[];

    const resultMenu: SectionElastic[] = await Promise.all(
      menu.map((item) => {
        if (item.level === 1) {
          const childSection = menu.filter(
            (section) => section.id_parent === item.id,
          );
          return {
            ...item,
            items: childSection,
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
