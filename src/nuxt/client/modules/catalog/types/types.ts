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
};

type DetailPageState = {
  product: ProductMain | object;
};

export type { CatalogState, DetailPageState };
