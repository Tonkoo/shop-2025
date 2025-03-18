import type { Search, Product, Section, TypeSearch } from '~/interfaces/global';

type AdminState = {
  isEdit: boolean;
  items: Section[] | Product[];
  viewModal: boolean;
  typeItem: string;
  countColumn: number;
  currentPage: number;
  allCount: number;
  typeSearch: TypeSearch;
  allName: Search[];
  searchName: string;
  searchParentName: string;
  selectedId: number;
  backSection: Section | null;
  frontSection: Section;
};

export type { AdminState };
