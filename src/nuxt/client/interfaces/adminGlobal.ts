import type { Product, Section } from '~/interfaces/global';

type SectionAdmin = Section & {
  images?: File[];
  parent?: SelectSection;
};

type ProductAdmin = Product & {
  images?: File[];
  section?: SelectSection;
  color?: Colors;
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

type ResponseError = {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
};

export type {
  SectionAdmin,
  ProductAdmin,
  StoreItem,
  TypeSearch,
  Search,
  SelectSection,
  ImageObject,
  ApiParams,
  Err,
  Colors,
  SelectColor,
  ResponseError,
  ImageElastic,
};
