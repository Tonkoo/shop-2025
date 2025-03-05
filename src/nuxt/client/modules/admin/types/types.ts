import type { Product, Section } from '~/interfaces/global';
import type { TypeSearch } from '~/interfaces/global';

type AdminState = {
  sectionItems: Section[] | Product[];
  viewModal: boolean;
  typeItem: string;
  countColumn: number;
  currentPage: number;
  allCount: number;
  typeSearch: TypeSearch;
};

export type { AdminState };
