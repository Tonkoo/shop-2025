import type { ProductMain, SectionMain } from '~/interfaces/global';

export type MainType = {
  sidebar: boolean;
  section: ProductMain[] | SectionMain[];
  product: ProductMain[] | SectionMain[];
};
