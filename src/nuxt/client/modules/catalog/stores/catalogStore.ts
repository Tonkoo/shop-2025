import { defineStore } from 'pinia';
import type { CatalogState } from '~/modules/catalog/types/types';
import type { ResultItemsCatalog } from '~/interfaces/global';

export const useCatalogStore = defineStore('catalog-store', {
  state: (): CatalogState => ({
    pathPage: '',
    itemCatalog: [],
    childSection: [],
    dialogFilter: false,
    sort: 'none',
  }),
  actions: {
    setParamCatalog(value: string) {
      this.pathPage = value;
    },
    setItems(value: ResultItemsCatalog) {
      this.itemCatalog = value.content.itemCatalog;
      this.childSection = value.content.childSection;
    },
    setDialogFilter() {
      if (!this.dialogFilter) {
        this.dialogFilter = true;
        return;
      }
      this.dialogFilter = false;
    },
    setSort(value: string) {
      this.sort = value;
    },
  },
});
