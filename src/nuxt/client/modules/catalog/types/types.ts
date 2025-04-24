import type {
  FilterCatalog,
  FilterStore,
  ProductMain,
  SectionMain,
  SortingItems,
} from '~/interfaces/global';

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
  getFilter: boolean;
  getSorting: boolean;
  sortingItems: SortingItems[];
};

type DetailPageState = {
  product: ProductMain;
  dialog: boolean;
};

export type { CatalogState, DetailPageState };
