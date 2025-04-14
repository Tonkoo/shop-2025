import { defineStore } from 'pinia';
import type { CatalogState } from '~/modules/catalog/types/types';
import type { ParamCatalog, ResultItemsCatalog } from '~/interfaces/global';

export const useCatalogStore = defineStore('catalog-store', {
  state: (): CatalogState => ({
    paramCatalog: {},
    itemCatalog: [],
    childSection: [],
  }),
  actions: {
    setParamCatalog(value: ParamCatalog) {
      this.paramCatalog = value;
    },
    setItems(value: ResultItemsCatalog) {
      this.itemCatalog = value.content.itemCatalog;
      this.childSection = value.content.childSection;
      console.log(this.childSection);
    },
  },
});
