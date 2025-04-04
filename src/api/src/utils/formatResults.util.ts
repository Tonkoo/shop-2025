import { camelCaseConverter } from './toCamelCase.util';
import {
  ProductElastic,
  resultItems,
  SectionElastic,
} from '../interfaces/global';

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
