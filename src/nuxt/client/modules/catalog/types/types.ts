import type { ProductMain, SectionMain } from '~/interfaces/global';

type CatalogState = {
  pathPage: string;
  itemCatalog: ProductMain[];
  childSection: SectionMain[];
  dialogFilter: boolean;
  sort: string;
};

export type { CatalogState };
