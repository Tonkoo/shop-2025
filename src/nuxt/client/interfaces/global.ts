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
};

type Product = {
  [key: string]: any;
  id: number;
  code: string;
  name: string;
  // images: File[];
  price: string;
  color: string;
  description: string;
  showOnMain: boolean;
  mainSlider: boolean;
  createAt?: string;
  updateAt?: string;
  section?: SelectSection;
  sectionId?: number;
  sectionName?: string;
  imageObject?: ImageObject[];
};

type ProductAdmin = Product & {
  images: File[];
};

type ProductMain = Product & {
  images: ImageElastic[];
};

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
  items: SectionMain[] | ProductMain[];
  total: number;
};

type ResultItemsAdmin = {
  items: SectionAdmin[] | ProductAdmin[];
  total: number;
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
  getSection?: boolean;
  getProduct?: boolean;
};
type Err = {
  name: boolean;
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
};
