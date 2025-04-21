import { camelCaseConverter } from './toCamelCase.util';
import {
  CatalogContent,
  mainLayout,
  ProductElastic,
  resultItems,
  SectionElastic,
} from '../interfaces/global';
import { payLoad } from '../modules/elasticsearch/dto/elasticsearch.dto';
import { SectionDto } from '../modules/sections/dto/section.dto';
import { ProductDto } from '../modules/products/dto/product.dto';
import { ElasticsearchService } from '../modules/elasticsearch/elasticsearch.service';

export function formatResults(
  items: (SectionElastic | ProductElastic)[],
  total: { value: number },
): resultItems {
  return {
    items: camelCaseConverter(items) as SectionElastic[] | ProductElastic[],
    total: total.value,
  };
}

export async function formatResponse(
  data: SectionDto | ProductDto,
  id: number,
  EsServices: ElasticsearchService,
) {
  const searchParams: payLoad = {
    type: data.type,
    from: Number(data.from),
    size: Number(data.size),
    searchName: data.searchName,
  };

  return data.getItems ? await EsServices.getItemsFilter(searchParams) : id;
}

export function formatMainContent(
  data: ProductElastic[],
  layout: mainLayout | null,
) {
  const mainSlider = data.filter((item) => item.main_slider);
  const mainGifts = data.filter((item) => item.show_on_main);
  if (layout) {
    return {
      content: {
        mainSlider,
        mainGifts,
      },
      layout,
    };
  }
  return {
    content: {
      mainSlider,
      mainGifts,
    },
  };
}

export function formatCatalogContent(
  result: CatalogContent,
  layout: mainLayout | null,
  onlyFilters: string,
) {
  const {
    typeItem,
    contentName,
    totalItems,
    itemCatalog,
    childSection,
    filter,
  } = result;

  if (onlyFilters === 'true') {
    return {
      content: {
        contentName,
        totalItems,
        filter,
      },
    };
  }
  if (layout) {
    return {
      content: {
        typeItem,
        contentName,
        totalItems,
        itemCatalog,
        childSection,
        filter,
      },
      layout,
    };
  }
  return {
    content: {
      typeItem,
      contentName,
      totalItems,
      itemCatalog,
      childSection,
      filter,
    },
  };
}
