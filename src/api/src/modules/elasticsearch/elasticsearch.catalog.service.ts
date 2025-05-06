import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';
import { logger } from '@utils/logger/logger';
import {
  AggregationsElastic,
  CatalogContent,
  FilterCatalog,
  PriceRange,
} from '@interfaces/catalogGlobal';
import { SectionElastic, ProductElastic } from '@interfaces/adminGlobal';
import { ParamsCatalog } from './dto/elasticsearch.dto';
import { formatCatalogContent } from '@utils/formatResults.util';
import { searchFromElastic } from '@utils/searchFromElastic.util';
import { getLayout } from '@utils/getLayout.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SortingOptions } from '@entities/sortingOptions.entity';

@Injectable()
export class ElasticsearchCatalogService {
  constructor(
    private readonly elasticsearchService: ESClient,
    @InjectRepository(SortingOptions)
    private readonly sortingRepository: Repository<SortingOptions>,
  ) {}

  /**
   *  Формирует массив с фильтрами
   * @param data
   * @param section
   */
  getFilterCatalog(data: FilterCatalog, section?: SectionElastic): any[] {
    const result: any[] = [{ term: { 'type.keyword': 'product' } }];

    if (data.priceTo || data.priceFrom) {
      const priceRange: PriceRange = {};
      if (data.priceFrom) priceRange.gte = Number(data.priceFrom);
      if (data.priceTo) priceRange.lte = Number(data.priceTo);

      result.push({
        range: {
          price: priceRange,
        },
      });
    }
    if (data.color.length !== 0) {
      result.push({ terms: { 'hexColor.keyword': data.color } });
    }

    if (section) {
      result.push({ term: { 'sectionName.keyword': section.name } });
    }
    return result;
  }

  /**
   * Возвращает дочерние разделы для указанного раздела
   * @param section
   */
  async getChildSection(section: SectionElastic) {
    if (!section) {
      const childSection = await searchFromElastic(
        {
          source: ['name', 'images', 'url'],
          query: {
            bool: {
              must: [{ term: { type: 'section' } }, { term: { level: 1 } }],
            },
          },
        },
        this.elasticsearchService,
      );
      return childSection.items as SectionElastic[];
    }

    const childSection = await searchFromElastic(
      {
        source: ['name', 'images', 'url'],
        query: {
          bool: {
            must: [
              { term: { type: 'section' } },
              { term: { id_parent: section.id } },
            ],
          },
        },
      },
      this.elasticsearchService,
    );

    return childSection.items as SectionElastic[];
  }

  /**
   * Находит элемент по его URL
   * @param url
   */
  async getItem(url: string) {
    const items = await searchFromElastic(
      {
        source: [
          'id',
          'name',
          'code',
          'images',
          'price',
          'description',
          'sectionName',
          'hexColor',
          'type',
        ],
        query: {
          bool: {
            must: [{ term: { 'url.keyword': url } }],
          },
        },
      },
      this.elasticsearchService,
    );

    return items.items[0];
  }

  /**
   * Создает параметры сортировки для ElasticSearch
   * @param sorting
   */
  async createSortOptions(sorting: string) {
    // TODO: убрать лишний запрос
    const srtOptions = await this.sortingRepository.findOne({
      where: { code: sorting },
    });
    if (!srtOptions) {
      throw new NotFoundException('Option sorting not found');
    }
    return [{ [srtOptions.field]: { order: srtOptions.order } }];
  }

  /**
   * Формирует агрегацию для запроса
   * @param isFilter
   */
  getAggregations(isFilter: boolean): AggregationsElastic | undefined {
    if (isFilter) {
      return {
        price: {
          stats: { field: 'price' },
        },
        color: {
          terms: { field: 'hexColor.keyword' },
        },
      };
    }
  }
  /**
   * Получает и обрабатывает данные для страницы каталога
   * @param params
   */
  async getItemsCatalog(params: ParamsCatalog) {
    const { url, filter, layout, isFilter, isSorting, onlyFilters } = params;
    const filterConvert: FilterCatalog = JSON.parse(filter) as FilterCatalog;
    try {
      const result: CatalogContent = {
        typeItem: 'section',
        contentName: 'Каталог',
        totalItems: 0,
        itemCatalog: [],
      };

      let item: SectionElastic | ProductElastic | null = null;
      if (url !== '/catalog/') {
        item = await this.getItem(url);
        result.typeItem = item.type;
        result.contentName = item.name;
      }

      if (result.typeItem === 'product') {
        result.itemCatalog = item as ProductElastic;
        return formatCatalogContent(
          result,
          layout ? await getLayout(this.elasticsearchService) : null,
          onlyFilters,
        );
      }
      if (result.typeItem === 'section') {
        const section = item as SectionElastic;
        result.childSection = await this.getChildSection(section);
        const filterCatalog = this.getFilterCatalog(filterConvert, section);

        // TODO: вынести в метод ?????.
        let defaultSortItem: SortingOptions | undefined;
        if (isSorting) {
          result.sortingItems = await this.sortingRepository.find();
          if (!filterConvert.sort) {
            defaultSortItem = result.sortingItems.find((item) => item.default);

            filterConvert.sort = defaultSortItem?.code || 'default';
          }
        }
        const sort = await this.createSortOptions(filterConvert.sort);

        const aggregations: AggregationsElastic | undefined =
          this.getAggregations(isFilter);

        const products = await searchFromElastic(
          {
            source: ['name', 'images', 'price', 'hexColor', 'url'],
            query: {
              bool: { must: filterCatalog },
            },
            sort,
            aggregations,
          },
          this.elasticsearchService,
        );
        result.totalItems = products.total.value;
        result.itemCatalog = products.items as ProductElastic[];
        result.filter = products.aggregations;
      }

      return formatCatalogContent(
        result,
        layout ? await getLayout(this.elasticsearchService) : null,
        onlyFilters,
      );
    } catch (err) {
      logger.error('Error from elastic.getItemCatalog: ', err);
      throw new BadRequestException('Error getting catalog items');
    }
  }
}
