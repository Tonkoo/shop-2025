type Section = {
  [key: string]: any;
  id: number;
  code: string;
  name: string;
  images: File[];
  createAt?: string;
  updateAt?: string;
  idParent: number | null;
  parent?: SelectSection;
  imageObject?: ImageObject[];
};

type Product = {
  [key: string]: any;
  id: number;
  code: string;
  name: string;
  images: File[];
  price: string;
  color: string;
  description: string;
  showOnMain: boolean;
  mainSlider: boolean;
  idSection: number | null;
  createAt?: string;
  updateAt?: string;
  section?: SelectSection;
  sectionId?: number;
  sectionName?: string;
  imageObject?: ImageObject[];
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

type ResultItems = {
  items: Section[] | Product[];
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
  Section,
  TypeSearch,
  Product,
  Search,
  SelectSection,
  ResultItems,
  ImageObject,
  ApiParams,
  Err,
};
