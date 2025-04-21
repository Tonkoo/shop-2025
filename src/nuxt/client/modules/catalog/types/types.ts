import type {
  FilterCatalog,
  FilterStore,
  ProductMain,
  SectionMain,
} from '~/interfaces/global';

type CatalogState = {
  pathPage: string;
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

export type { CatalogState };
