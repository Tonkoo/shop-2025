import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService as ESClient } from '@nestjs/elasticsearch';
import { logger } from '../../utils/logger/logger';
import {
  aggregationsElastic,
  CatalogContent,
  FilterCatalog,
  PriceRange,
  ProductElastic,
  SectionElastic,
} from '../../interfaces/global';
import { ParamsCatalog } from './dto/elasticsearch.dto';
import { formatCatalogContent } from '../../utils/formatResults.util';
import { searchFromElastic } from '../../utils/searchFromElastic.util';
import { getLayout } from '../../utils/getLayout.util';

@Injectable()
export class ElasticsearchCatalogService {
  constructor(private readonly elasticsearchService: ESClient) {}

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

  async getChildSection(section: SectionElastic) {
    if (!section) {
      const childSection = await searchFromElastic(
        {
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

  async getItem(url: string) {
    const items = await searchFromElastic(
      {
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

  createSortOptions(sorting: string) {
    let sort: any[] = [];
    switch (sorting) {
      case 'none':
        sort = [];
        break;
      case 'newProduct':
        sort = [{ 'create_at.keyword': { order: 'asc' } }];
        break;
      case 'ascPrice':
        sort = [{ price: { order: 'asc' } }];
        break;
      case 'descPrice':
        sort = [{ price: { order: 'desc' } }];
        break;
      default:
        sort = [];
        break;
    }
    return sort;
  }

  async getItemsCatalog(params: ParamsCatalog) {
    const { url, filter, layout, getFilter, onlyFilters } = params;
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

      // TODO разделить по методам
      // TODO: прибраться в форматах возвращаемых данных.
      if (result.typeItem === 'section') {
        const section = item as SectionElastic;
        result.childSection = await this.getChildSection(section);
        const filterCatalog = this.getFilterCatalog(filterConvert, section);
        const sort = this.createSortOptions(filterConvert.sort);

        let aggregations: aggregationsElastic | undefined;
        if (getFilter) {
          aggregations = {
            price: {
              stats: { field: 'price' },
            },
            color: {
              terms: { field: 'hexColor.keyword' },
            },
          };
        }

        const products = await searchFromElastic(
          {
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
      if (result.typeItem === 'product') {
        result.itemCatalog = item as ProductElastic;
      }
      return formatCatalogContent(
        result,
        layout ? await getLayout(this.elasticsearchService) : null,
        getFilter,
        onlyFilters,
      );
    } catch (err) {
      logger.error('Error from elastic.getItemCatalog: ', err);
      throw new BadRequestException('Error getting catalog items');
    }
  }
}
