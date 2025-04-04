import { camelCaseConverter } from './toCamelCase.util';
import {
  ProductElastic,
  resultItems,
  SectionElastic,
} from '../interfaces/global';

export function formatResults(
  items: (SectionElastic | ProductElastic)[],
  total: { value: number },
): resultItems[] {
  console.log(items);
  console.log(total);
  const result: resultItems[] = [];
  if (typeof total === 'object' && total !== null && 'value' in total) {
    result.push({
      items: camelCaseConverter(items) as SectionElastic[] | ProductElastic[],
      total: total.value,
    });
  }
  console.log(result);
  return result;
}
