import type {
  Search,
  TypeSearch,
  Err,
  StoreItem,
  ProductAdmin,
  SectionAdmin,
  Colors,
  SelectSection,
  SelectColor,
} from '~/interfaces/global';

type AdminState = {
  isEdit: boolean;
  items: StoreItem[];
  delDialog: boolean;
  viewModal: boolean;
  typeItem: string;
  nameColumnSection: string;
  countColumn: number;
  currentPage: number;
  allCount: number;
  typeSearch: TypeSearch;
  allName: Search[];
  searchName: string;
  searchParentName: string;
  searchSection: string;
  selectedId: number;
  backSection: SectionAdmin | null;
  backProduct: ProductAdmin | null;
  frontSection: SectionAdmin;
  sectionForm: SelectSection;
  frontProduct: ProductAdmin;
  colorForm: SelectColor;
  errors: Err;
  disableBtn: boolean;
  filterSection: SectionAdmin | null;
  itemsFilter: Search[];
  colors: Colors[];
};

export type { AdminState };
