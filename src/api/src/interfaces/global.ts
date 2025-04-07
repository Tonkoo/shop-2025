import { Sections } from '../entities/sections.entity';
import { Products } from '../entities/products.entity';
import { Images } from '../entities/images.entity';

type Product = {
  id: number;
  code: string;
  name: string;
  price: number;
  color: Colors;
  // color: string;
  description: string;
  section: parentSection;
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
  DateClient & {
    images: imageData[];
    type: string;
    section: parentSection;
    sectionName?: string;
  };

type ProductClient = Product &
  DateClient & {
    images: number[] | null;
  };

type ProductBase = Product &
  DateBase & {
    images: number[] | null;
    imageObject?: Images[];
  };

type ProductElastic = Products &
  DateClient & {
    section: number;
    sectionName: string;
  };

type Section = {
  id: number;
  code: string;
  name: string;
  id_parent: number | null;
  level: number;
};

type SectionEntities = Section &
  DateClient & {
    images: imageData[];
    // parent?: parentSection;
    imageObject?: Images[];
    type: string;
    sectionName?: string;
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
  };

type SectionElastic = Section &
  DateClient & {
    type: string;
    sectionName: string;
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

type Colors = {
  id: number;
  name: string;
  hex: string;
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
  data: ProductEntities | SectionEntities;
};
type resultItems = {
  items:
    | Sections
    | Products
    | (Sections | Products)[]
    | SectionElastic[]
    | ProductElastic[];
  total: number;
};

type payLoadTest = {
  source?: string[];
  size?: number;
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
  SectionBase,
  ProductEntities,
  SectionEntities,
  elasticBody,
  resultItems,
  payLoadTest,
  parentSection,
  ProductClient,
  SectionClient,
  ProductBase,
  SectionElastic,
  ProductElastic,
};
