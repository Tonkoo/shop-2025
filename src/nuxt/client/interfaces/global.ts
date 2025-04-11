type Section = {
  [key: string]: any;
  id: number;
  code: string;
  name: string;
  // images: File[];
  createAt?: string;
  updateAt?: string;
  idParent: number | null;
  level: number;
  parent?: SelectSection;
  imageObject?: ImageObject[];
};

type SectionAdmin = Section & {
  images: File[];
};

type SectionMain = Section & {
  images: ImageElastic[];
  id_parent?: number;
  url: string;
  items?: SectionMain[];
};

type Product = {
  [key: string]: any;
  id: number;
  code: string;
  name: string;
  price: number;
  color: Colors;
  colorId?: number;
  description: string;
  showOnMain: boolean;
  mainSlider: boolean;
  createAt?: string;
  updateAt?: string;
  section: SelectSection;
  sectionId?: number;
  imageObject?: ImageObject[];
};

type ProductAdmin = Product & {
  images: File[];
};

type ProductMain = Product & {
  images: ImageElastic[];
  hexColor: string;
  url: string;
};

// type ProductMain = {
//
//   item: Product & {
//     images: ImageElastic[];
//     hexColor: string;
//   };
// };

type StoreItem = SectionMain | SectionAdmin | ProductAdmin | ProductMain;

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
  color?: string;
  description?: string;
  section?: string;
};
type ParamCatalog = {
  parentCatalogCode: string;
  childCatalogCode?: string;
  nestedChildCatalogCode?: string;
};
type Colors = {
  id: number;
  name: string;
  hex: string;
};

export type {
  SectionMain,
  SectionAdmin,
  ProductAdmin,
  ProductMain,
  StoreItem,
  TypeSearch,
  // Product,
  Search,
  SelectSection,
  ResultItemsAdmin,
  ResultItemsMain,
  ImageObject,
  ApiParams,
  Err,
  ParamCatalog,
  ResultReindex,
  Colors,
};
