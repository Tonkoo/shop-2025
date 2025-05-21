import { Sections } from '@entities/sections.entity.js';
import { Products } from '@entities/products.entity.js';
import { Images } from '@entities/images.entity.js';

type DateBase = {
  update_at: Date;
  create_at: Date;
};

type DateClient = {
  update_at: string;
  create_at: string;
};

type Product = {
  id: number;
  code: string;
  name: string;
  price: number;
  color?: Colors;
  description: string;
  section: parentSection;
  show_on_main: boolean;
  main_slider: boolean;
};

type ProductElastic = Product &
  DateClient & {
    images: ImageData[];
    type: string;
    sectionName?: string;
    hexColor?: string;
    url?: string;
  };

type ProductClient = Product &
  DateClient & {
    images: number[] | null;
    idSection?: number;
    sectionName?: string;
    hexColor?: string;
  };

type ProductBase = Product &
  DateBase & {
    images: number[] | null;
    idSection?: number;
    idColor?: number;
    imageObject?: Images[];
  };

type Section = {
  id: number;
  code: string;
  name: string;
  id_parent: number | null;
  level: number;
};

type SectionElastic = Section &
  DateClient & {
    images: ImageData[];
    type: string;
    sectionName?: string;
    url?: string;
    items?: SectionElastic[];
  };

type SectionBase = Sections &
  DateBase & {
    images: number[] | null;
    parent?: parentSection;
    imageObject?: Images[];
  };

type SectionClient = Section &
  DateClient & {
    images: number[] | null;
    products?: Products[];
  };

type Colors = {
  id: number;
  name: string;
  hex: string;
};

type ImageData = {
  alt: string;
  src: string;
};

type ElasticBody = {
  index: {
    _index: string;
    _id: number;
  };
  data: ProductElastic | SectionElastic;
};

type PayLoadTest = {
  source?: string[];
  size?: number;
  from?: number;
  query: {
    bool: any;
  };
  aggregations?: any;
  sort?: any[];
};

type parentSection = {
  id: number;
  name: string;
};

export {
  ImageData,
  SectionBase,
  ElasticBody,
  PayLoadTest,
  ProductClient,
  SectionClient,
  ProductBase,
  SectionElastic,
  ProductElastic,
};
