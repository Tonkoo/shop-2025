import { Sections } from '../entities/sections.entity';
import { Products } from '../entities/products.entity';
import { Images } from '../entities/images.entity';
import { SortingOptions } from '../entities/sortingOptions.entity';

type Product = {
  id: number;
  code: string;
  name: string;
  price: number;
  color: Colors;
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
    sectionName?: string;
    hexColor?: string;
    url?: string;
  };

type ProductClient = Product &
  DateClient & {
    images: number[] | null;
  };

type ProductBase = Product &
  DateBase & {
    images: number[] | null;
    idSection?: number;
    idColor?: number;
    imageObject?: Images[];
  };

type ProductElastic = Product &
  DateClient & {
    type: string;
    section: number;
    sectionName: string;
    url: string;
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
    imageObject?: Images[];
    type: string;
    sectionName?: string;
    url?: string;
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
    url: string;
    items?: SectionElastic[];
  };

type response = {
  statusCode: number;
  data: object | number | undefined;
};

type elasticsearchResponse = {
  total: { value: number };
  items: (SectionElastic | ProductElastic)[];
  aggregations?: ResultFilterCatalog;
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
  aggregations?: any;
  sort?: any[];
};

type parentSection = {
  id: number;
  name: string;
};

type mainLayout = {
  menu: SectionElastic[];
};

type mainContent = {
  content: {
    mainSlider: ProductElastic[];
    mainGifts: ProductElastic[];
  };
};

// type mainResponse = mainContent & {
//   layout: mainLayout;
// };

type CatalogContent = {
  typeItem: string;
  contentName: string;
  totalItems: number;
  itemCatalog: ProductElastic[] | [] | ProductElastic;
  childSection?: SectionElastic[];
  filter?: ResultFilterCatalog;
  sortingItems?: SortingOptions[];
};

// type CatalogLayout = CatalogContent & {
//   layout: mainLayout;
// };

type FilterCatalog = {
  sort: string;
  priceFrom: string;
  priceTo: string;
  color: string[];
};

// type ParamsCatalog = {
//   url: string;
//   sorting: string;
//   filter: string;
//   layout: string;
//   onlyFilters: string;
// };

type AggregationsFilter = {
  price: {
    min: number;
    max: number;
  };
  color: {
    buckets: { key: string }[];
  };
};
type ResultFilterCatalog = {
  price: {
    min: number;
    max: number;
  };
  color: string[];
};

type PriceRange = {
  gte?: number;
  lte?: number;
};

type ParamsAdmin = {
  type: string;
  from: number;
  size: number;
  searchName: string;
  getItems: boolean;
};

type aggregationsElastic = {
  price: {
    stats: { field: string };
  };
  color: {
    terms: { field: string };
  };
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
  mainLayout,
  mainContent,
  // mainResponse,
  CatalogContent,
  // CatalogLayout,
  FilterCatalog,
  // ParamsCatalog,
  ResultFilterCatalog,
  AggregationsFilter,
  PriceRange,
  ParamsAdmin,
  aggregationsElastic,
};
