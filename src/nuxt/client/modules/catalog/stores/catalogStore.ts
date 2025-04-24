import { defineStore } from 'pinia';
import type { CatalogState } from '~/modules/catalog/types/types';
import type { ProductMain, ResultItemsCatalog } from '~/interfaces/global';
import {
  filterCatalogDefault,
  filterDefault,
} from '~/entities/catalog.entites';

export const useCatalogStore = defineStore('catalog-store', {
  state: (): CatalogState => ({
    itemCatalog: [],
    childSection: [],
    totalItems: 0,
    filter: { ...filterDefault },
    dialogFilter: false,
    filterCatalog: { ...filterCatalogDefault },
    onlyFilter: false,
    availableColors: [],
    filterPrice: false,
    contentName: '',
    getFilter: true,
  }),
  actions: {
    setItems(value: ResultItemsCatalog) {
      this.itemCatalog = value.content.itemCatalog as ProductMain[];
      this.childSection = value.content.childSection;
      this.totalItems = value.content.totalItems;
      this.contentName = value.content.contentName;
    },
    setFilter(value: ResultItemsCatalog) {
      this.filter = value.content.filter;
    },
    setAvailableColors(value: string[]) {
      this.availableColors = value;
    },
    setTotalItems(value: number) {
      this.totalItems = value;
    },
    setDialogFilter() {
      if (!this.dialogFilter) {
        this.dialogFilter = true;
        return;
      }
      this.dialogFilter = false;
    },
    setSort(value: string) {
      this.filterCatalog.sort = value;
    },
    setColor(value: string) {
      if (this.filterCatalog.color.includes(value)) {
        this.filterCatalog.color = this.filterCatalog.color.filter(
          (c) => c !== value
        );
      } else {
        this.filterCatalog.color.push(value);
      }
    },
    setOnlyFilter(value: boolean) {
      this.onlyFilter = value;
    },
    clearFilter() {
      this.filterCatalog = { ...filterCatalogDefault, color: [] };
      this.availableColors = this.filter.color;
    },
    setFilterPrice(value: boolean) {
      this.filterPrice = value;
    },
    setPriceFrom(value: string) {
      this.filterCatalog.priceFrom = value;
    },
    setPriceTo(value: string) {
      this.filterCatalog.priceTo = value;
    },
    setGetFilter(value: boolean) {
      this.getFilter = value;
    },
  },
});
