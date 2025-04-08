import { camelCaseConverter } from './toCamelCase.util';
import {
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
  // const result: resultItems[] = [];
  // if (typeof total === 'object' && total !== null && 'value' in total) {
  //   result.push({
  //     items: camelCaseConverter(items) as SectionElastic[] | ProductElastic[],
  //     total: total.value,
  //   });
  // }
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
