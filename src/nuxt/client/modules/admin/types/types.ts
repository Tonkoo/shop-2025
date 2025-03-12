import type {
  Search,
  Product,
  Section,
  formParentSection,
  TypeSearch,
} from '~/interfaces/global';

type AdminState = {
  items: Section[] | Product[];
  viewModal: boolean;
  typeItem: string;
  countColumn: number;
  currentPage: number;
  allCount: number;
  typeSearch: TypeSearch;
  allName: Search[];
  searchName: string;
  formNameSection: string;
  formParentSection: formParentSection;
  formFile: Array<File>;
  selectedId: number;
  selectedSection: Section | null;
};

export type { AdminState };
