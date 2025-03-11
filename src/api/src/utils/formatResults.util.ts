import { elasticsearchResponse, resultItems } from '../interfaces/global';
import { camelCaseConverter } from './toCamelCase.util';
import { Sections } from '../entities/sections.entity';
import { Products } from '../entities/products.entity';

export function formatResults(items: elasticsearchResponse): resultItems[] {
  const result: resultItems[] = [];
  const total = items.hits.total;
  if (typeof total === 'object' && total !== null && 'value' in total) {
    result.push({
      items: camelCaseConverter(
        items.hits.hits.map(
          (items): Sections | Products => items._source as Sections | Products,
        ),
      ),
      total: total.value,
    });
  }

  return result;
}
