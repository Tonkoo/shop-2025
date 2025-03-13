import { Sections } from '../entities/sections.entity';
import { Products } from '../entities/products.entity';
import { Images } from '../entities/images.entity';

type ProductEntities = {
  id: number;
  code: string;
  name: string;
  images: number[];
  price: number;
  color: string;
  description: string;
  id_section: number;
  show_on_main: boolean;
  main_slider: boolean;
  update_at: Date;
  create_at: Date;
};

type SectionEntities = {
  id: number;
  code: string;
  name: string;
  images: number[];
  update_at: Date;
  create_at: Date;
  id_parent: number | null;
  parent?: Sections;
  imageObject?: Images[];
};

type response = {
  statusCode: number;
  data: object | number | undefined;
};

type elasticsearchResponse = {
  hits: {
    total?:
      | {
          value: number;
          relation: string;
        }
      | number;
    hits: Array<{
      _source?: any;
    }>;
  };
};

type imageData = {
  alt: string;
  src: string;
};

type documentProduct = {
  id: number;
  code: string;
  name: string;
  images: imageData[];
  price: number;
  color: string;
  description: string;
  show_on_main: boolean;
  main_slider: boolean;
  update_at: Date;
  create_at: Date;
  type: string;
};

type documentSection = {
  id: number;
  code: string;
  name: string;
  images: imageData[];
  update_at: Date;
  create_at: Date;
  id_parent: number | null;
  type: string;
};

type elasticBody = {
  index: {
    _index: string;
    _id: number;
  };
  data: documentProduct | documentSection;
};
type resultItems = {
  items: Sections | Products | (Sections | Products)[];
  total?: number | undefined;
};

type payLoadTest = {
  source?: string[];
  size: number;
  from?: number;
  query: {
    bool: any;
  };
};

export {
  response,
  elasticsearchResponse,
  imageData,
  documentProduct,
  documentSection,
  ProductEntities,
  SectionEntities,
  elasticBody,
  resultItems,
  payLoadTest,
};
