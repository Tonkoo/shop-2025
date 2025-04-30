import type { ProductAdmin, SectionAdmin } from '~/interfaces/adminGlobal';
import { isEqual } from 'lodash';

export function comparisonValues<T extends SectionAdmin | ProductAdmin>(
  data: T,
  oldData: T | null,
  exclude: string[]
): Partial<T> {
  if (!oldData) return { ...data };

  return Object.keys(data).reduce<Partial<T>>((acc, key) => {
    if (!exclude.includes(key)) {
      const field = key as keyof T;
      if (!isEqual(data[field], oldData[field])) {
        acc[field] = data[field];
      }
    }
    return acc;
  }, {});
}
