import type {
  FilterCatalog,
  FilterStore,
  ProductMain,
  SectionMain,
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
};

type DetailPageState = {
  product: ProductMain;
};

export type { CatalogState, DetailPageState };
