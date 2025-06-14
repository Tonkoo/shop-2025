import { SortingOptions } from '@entities/sortingOptions.entity.js';
import { ProductElastic, SectionElastic } from './adminGlobal.js';
import { ResultFilterCatalog } from './responseGlobal.js';

type CatalogContent = {
  typeItem: string;
  contentName: string;
  totalItems: number;
  itemCatalog: ProductElastic[] | [] | ProductElastic;
  childSection?: SectionElastic[];
  filter?: ResultFilterCatalog;
  sortingItems?: SortingOptions[];
};

type FilterCatalog = {
  sort: string;
  priceFrom: string;
  priceTo: string;
  color: string[];
};

type AggregationsFilter = {
  price: {
    min: number;
    max: number;
  };
  color: {
    buckets: { key: string }[];
  };
};

type PriceRange = {
  gte?: number;
  lte?: number;
};

type AggregationsElastic = {
  price: {
    stats: { field: string };
  };
  color: {
    terms: { field: string };
  };
};

export {
  CatalogContent,
  FilterCatalog,
  ResultFilterCatalog,
  AggregationsFilter,
  PriceRange,
  AggregationsElastic,
};
