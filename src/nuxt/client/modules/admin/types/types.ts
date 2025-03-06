import type {
  Search,
  Product,
  Section,
  formParentSection,
} from '~/interfaces/global';
import type { TypeSearch } from '~/interfaces/global';

type AdminState = {
  items: Section[] | Product[];
  viewModal: boolean;
  typeItem: string;
  countColumn: number;
  currentPage: number;
  allCount: number;
  typeSearch: TypeSearch;
  allName: Search[];
  searchName: Search;
  formNameSection: string;
  formParentSection: formParentSection;
  formFile: Array<File>;
};

export type { AdminState };
