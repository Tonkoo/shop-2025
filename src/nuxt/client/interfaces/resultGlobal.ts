import type { ProductMain, SectionMain } from '~/interfaces/mainGlobal';
import type { SectionAdmin, ProductAdmin } from '~/interfaces/adminGlobal';
import type { FilterCatalog, SortingItems } from '~/interfaces/catalogGlobal';

type ResultItemsMain = {
  content: {
    mainGifts: ProductMain[];
    mainSlider: ProductMain[];
  };
  layout: {
    menu: SectionMain[];
  };
};

type ResultItemsAdmin = {
  items: SectionAdmin[] | ProductAdmin[];
  total: number;
};
type ResultReindex = {
  data: {
    message: string;
  };
  statusCode: number;
};

type ResultItemsCatalog = {
  content: {
    typeItem: string;
    contentName: string;
    totalItems: number;
    itemCatalog: ProductMain[] | ProductMain;
    childSection: SectionMain[];
    filter: FilterCatalog;
    sortingItems: SortingItems[];
  };
  layout: {
    menu: SectionMain[];
  };
};

type AuthorizationResponse = {
  success: boolean;
  access_token: string;
  expires_in: number;
};

type ResponseIntrospect = {
  sub?: string;
  username?: string;
  given_name?: string;
  family_name?: string;
  active: boolean;
};

export type {
  ResultItemsAdmin,
  ResultItemsMain,
  ResultReindex,
  ResultItemsCatalog,
  FilterCatalog,
  AuthorizationResponse,
  ResponseIntrospect,
};
