import type {
  Search,
  Product,
  Section,
  TypeSearch,
  Err,
} from '~/interfaces/global';

type AdminState = {
  isEdit: boolean;
  items: Section[] | Product[];
  delDialog: boolean;
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
  errors: Err;
};

export type { AdminState };
