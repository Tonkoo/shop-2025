import { defineStore } from 'pinia';
import type { CatalogState } from '~/modules/catalog/types/types';
import type { ProductMain, ResultItemsCatalog } from '~/interfaces/global';

export const useCatalogStore = defineStore('catalog-store', {
  state: (): CatalogState => ({
    itemCatalog: [],
    childSection: [],
    totalItems: 0,
    filter: {
      color: [],
      price: {
        min: 0,
        max: 0,
      },
    },
    dialogFilter: false,
    filterCatalog: {
      sort: 'none',
      priceFrom: '',
      priceTo: '',
      color: [],
    },
    onlyFilter: false,
    availableColors: [],
    filterPrice: false,
    contentName: '',
  }),
  actions: {
    setItems(value: ResultItemsCatalog) {
      this.itemCatalog = value.content.itemCatalog as ProductMain[];
      this.childSection = value.content.childSection;
      this.totalItems = value.content.totalItems;
      this.contentName = value.content.contentName;
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
      this.filterCatalog = {
        sort: 'none',
        priceFrom: '',
        priceTo: '',
        color: [],
      };
    },
    removeColor(value: string) {
      this.filterCatalog.color = this.filterCatalog.color.filter(
        (item) => item !== value
      );
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
  },
});
