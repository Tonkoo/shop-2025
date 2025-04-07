import type {
  Search,
  TypeSearch,
  Err,
  StoreItem,
  ProductAdmin,
  SectionAdmin,
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
  frontProduct: ProductAdmin;
  errors: Err;
  disableBtn: boolean;
  filterSection: SectionAdmin | null;
  itemsFilter: Search[];
};

export type { AdminState };
