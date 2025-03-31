//TODO: переписать метод, fields не использовать. вместо for reduce
import type { ProductAdmin, SectionAdmin } from '~/interfaces/global';
import { isEqual } from 'lodash';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export function comparisonValues<T extends SectionAdmin | ProductAdmin>(
  data: T,
  oldData: T | null,
  exclude: string[]
): Partial<T> {
  // const adminStore = useAdminStore();
  // const result: Partial<T> = {};
  //
  // const fields: (keyof T)[] = ['name', 'images'];
  //
  // if (adminStore.typeItem === 'section') {
  //   fields.push('parent');
  // } else {
  //   fields.push(
  //     'price',
  //     'color',
  //     'description',
  //     'section',
  //     'showOnMain',
  //     'mainSlider'
  //   );
  // }
  //
  // for (const field of fields) {
  //   if (!isEqual(data[field], oldData?.[field])) {
  //     result[field] = data[field];
  //   }
  // }
  //
  // return result;
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
