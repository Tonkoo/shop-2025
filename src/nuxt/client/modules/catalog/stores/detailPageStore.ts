import { defineStore } from 'pinia';
import type { DetailPageState } from '~/modules/catalog/types/types';
import type { ProductMain } from '~/interfaces/global';

export const useDetailPageStore = defineStore('detailPage-store', {
  state: (): DetailPageState => ({
    product: {},
  }),
  actions: {
    setProduct(value: ProductMain) {
      this.product = value;
    },
  },
});
