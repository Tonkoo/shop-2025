import type {
  FilterCatalog,
  FilterStore,
  SortingItems,
} from '~/interfaces/catalogGlobal';
import type { ProductMain, SectionMain } from '~/interfaces/mainGlobal';

type CatalogState = {
  itemCatalog: ProductMain[];
  childSection: SectionMain[];
  filter: FilterCatalog;
  dialogFilter: boolean;
  filterCatalog: FilterStore;
  onlyFilter: boolean;
  totalItems: number;
  availableColors: string[];
  filterPrice: boolean;
  contentName: string;
  isFilter: boolean;
  isSorting: boolean;
  sortingItems: SortingItems[];
};

type DetailPageState = {
  product: ProductMain;
  dialog: boolean;
};

export type { CatalogState, DetailPageState };
