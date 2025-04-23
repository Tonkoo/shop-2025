import { defineStore } from 'pinia';
import type { DetailPageState } from '~/modules/catalog/types/types';
import type { ProductMain } from '~/interfaces/global';

export const useDetailPageStore = defineStore('detailPage-store', {
  state: (): DetailPageState => ({
    product: {
      id: 0,
      code: '',
      name: '',
      price: 0,
      idColor: 0,
      description: '',
      showOnMain: false,
      mainSlider: false,
      idSection: 0,
      images: [],
      hexColor: '',
      url: '',
    },
  }),
  actions: {
    setProduct(value: ProductMain) {
      this.product = value;
    },
  },
});
