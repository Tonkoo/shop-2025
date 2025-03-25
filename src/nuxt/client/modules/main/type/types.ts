import type { Product, Section } from '~/interfaces/global';

export type MainType = {
  sidebar: boolean;
  itemsFooter: Section[] | Product[];
  menuSection: Section[] | Product[];
};
