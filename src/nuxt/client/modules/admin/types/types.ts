import type {
  Search,
  Product,
  Section,
  TypeSearch,
  SectionBack,
} from '~/interfaces/global';

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
  selectedId: number;
  selectedSection: Section | null;
  section: Section;
  sectionBackend: SectionBack;
};

export type { AdminState };
