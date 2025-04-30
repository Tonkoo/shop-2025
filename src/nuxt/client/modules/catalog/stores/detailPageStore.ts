import { defineStore } from 'pinia';
import type { DetailPageState } from '~/modules/catalog/types/types';
import type { ProductMain } from '~/interfaces/mainGlobal';
import { productMainDefault } from '~/entities/product.entites';

export const useDetailPageStore = defineStore('detailPage-store', {
  state: (): DetailPageState => ({
    product: {
      ...productMainDefault,
    },
    dialog: false,
  }),
  actions: {
    setProduct(value: ProductMain) {
      this.product = value;
    },
    setDialog() {
      if (!this.dialog) {
        this.dialog = true;
        return;
      }
      this.dialog = false;
    },
  },
});
