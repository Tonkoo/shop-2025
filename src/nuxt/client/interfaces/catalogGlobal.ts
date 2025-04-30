type FilterCatalog = {
  price: {
    min: number;
    max: number;
  };
  color: string[];
};
type SortingItems = {
  id: number;
  name: string;
  order: string;
  default: boolean;
  code: string;
  field: string;
};

type FilterStore = {
  sort: string;
  // sort: SortingItems;
  priceFrom: string;
  priceTo: string;
  color: string[];
};

type EmitUpdateFilter = {
  property: string;
  value: string;
};

export type { FilterCatalog, FilterStore, EmitUpdateFilter, SortingItems };
