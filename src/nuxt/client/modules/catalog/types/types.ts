import type {
  ParamCatalog,
  ProductMain,
  SectionMain,
} from '~/interfaces/global';

type CatalogState = {
  paramCatalog: ParamCatalog;
  itemCatalog: ProductMain[];
  childSection: SectionMain[];
  dialogFilter: boolean;
};

export type { CatalogState };
