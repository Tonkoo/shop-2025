import { defineStore } from 'pinia';
import type { CatalogState } from '~/modules/catalog/types/types';
import type { ParamCatalog } from '~/interfaces/global';

export const useCatalogStore = defineStore('catalog-store', {
  state: (): CatalogState => ({
    paramCatalog: {
      parentCatalogCode: '',
    },
  }),
  actions: {
    setParamCatalog(value: ParamCatalog) {
      this.paramCatalog = value;
    },
  },
});
