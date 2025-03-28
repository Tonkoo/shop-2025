import { camelCaseConverter } from './toCamelCase.util';
import { resultItems } from '../interfaces/global';

export function formatResults(
  items: any,
  total: { value: number },
): resultItems[] {
  const result: resultItems[] = [];
  if (typeof total === 'object' && total !== null && 'value' in total) {
    result.push({
      items: camelCaseConverter(items),
      total: total.value,
    });
  }

  return result;
}
