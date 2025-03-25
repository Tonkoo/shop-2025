import type { Product, Section } from '~/interfaces/global';

export type MainType = {
  sidebar: boolean;
  section: Section[] | Product[];
};
