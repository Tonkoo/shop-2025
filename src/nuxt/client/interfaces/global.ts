// TODO: расскидать по отдельным файлам
type Section = {
  id: number;
  code: string;
  name: string;
  createAt?: string;
  updateAt?: string;
  idParent?: number | null;
  level: number;
  imageObject?: ImageObject[];
};

type SectionAdmin = Section & {
  images?: File[];
  parent?: SelectSection;
};

type SectionMain = Section & {
  images: ImageElastic[];
  id_parent?: number;
  url: string;
  items?: SectionMain[];
};

type Product = {
  id: number;
  code: string;
  name: string;
  price: number;
  idColor: number;
  description: string;
  showOnMain: boolean;
  mainSlider: boolean;
  createAt?: string;
  updateAt?: string;
  idSection: number;
  imageObject?: ImageObject[];
};

type ProductAdmin = Product & {
  images?: File[];
  section?: SelectSection;
  color?: Colors;
};

type ProductMain = Product & {
  images: ImageElastic[];
  hexColor: string;
  url: string;
  sectionName: string;
};

type StoreItem = SectionAdmin | ProductAdmin;

type ImageElastic = {
  alt: string;
  src: string;
};

interface TypeSearch {
  label: string;
  value: string;
}

interface Search {
  id: number;
  name: string;
}

type SelectSection = {
  id: number;
  name: string;
};

type SelectColor = {
  id: number;
  name: string;
};

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

type ImageObject = {
  id: number;
  name: string;
  path: string;
  type: string;
};

type ApiParams = {
  type: string;
  from: number | string;
  size: number | string;
  searchName: string;
  getItems?: boolean;
  filterSection?: number;
  typeForm?: string;
};
type Err = {
  name?: string;
  price?: string;
  idColor?: string;
  description?: string;
  idSection?: string;
};

type Colors = {
  id: number;
  name: string;
  hex: string;
};

type FilterCatalog = {
  price: {
    min: number;
    max: number;
  };
  color: string[];
};
type SortingItems = {
  id: number;
  name: string;
  order: string;
  default: boolean;
  code: string;
  field: string;
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

type FilterStore = {
  sort: string;
  // sort: SortingItems;
  priceFrom: string;
  priceTo: string;
  color: string[];
};

type EmitUpdateFilter = {
  property: string;
  value: string;
};

type responseError = {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
};

export type {
  SectionMain,
  SectionAdmin,
  ProductAdmin,
  ProductMain,
  StoreItem,
  TypeSearch,
  Search,
  SelectSection,
  ResultItemsAdmin,
  ResultItemsMain,
  ImageObject,
  ApiParams,
  Err,
  ResultReindex,
  Colors,
  ResultItemsCatalog,
  FilterCatalog,
  FilterStore,
  SelectColor,
  EmitUpdateFilter,
  SortingItems,
  responseError,
};
