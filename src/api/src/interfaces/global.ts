import { Sections } from '../entities/sections.entity';
import { Products } from '../entities/products.entity';
import { Images } from '../entities/images.entity';

type Product = {
  id: number;
  code: string;
  name: string;
  price: number;
  color: string;
  description: string;
  id_section: number;
  show_on_main: boolean;
  main_slider: boolean;
};

type DateBase = {
  update_at: Date;
  create_at: Date;
};

type DateClient = {
  update_at: string;
  create_at: string;
};

type ProductEntities = Product &
  DateBase & {
    images: number[];
  };

type DocumentProduct = Product &
  DateBase & {
    images: imageData[];
    type: string;
  };

type ProductClient = Product &
  DateClient & {
    images: number[];
  };

type Section = {
  id: number;
  code: string;
  name: string;
  id_parent: number | null;
};

type SectionEntities = Section &
  DateBase & {
    images: number[];
    parent?: parentSection;
    imageObject?: Images[];
  };

type DocumentSection = Sections &
  DateBase & {
    images: imageData[];
    type: string;
  };
type SectionClient = Section &
  DateClient & {
    images: number[];
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

type elasticBody = {
  index: {
    _index: string;
    _id: number;
  };
  data: DocumentProduct | DocumentSection;
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

type parentSection = {
  id: number;
  name: string;
};

export {
  response,
  elasticsearchResponse,
  imageData,
  DocumentProduct,
  DocumentSection,
  ProductEntities,
  SectionEntities,
  elasticBody,
  resultItems,
  payLoadTest,
  parentSection,
  ProductClient,
  SectionClient,
};
