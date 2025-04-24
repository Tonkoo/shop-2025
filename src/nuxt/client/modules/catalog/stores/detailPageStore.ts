import { defineStore } from 'pinia';
import type { DetailPageState } from '~/modules/catalog/types/types';
import type { ProductMain } from '~/interfaces/global';
import { productMainDefault } from '~/entities/product.entites';

export const useDetailPageStore = defineStore('detailPage-store', {
  state: (): DetailPageState => ({
    product: {
      ...productMainDefault,
    },
  }),
  actions: {
    setProduct(value: ProductMain) {
      this.product = value;
    },
  },
});
