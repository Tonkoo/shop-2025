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
      color: {
        id: 0,
        name: '',
        hex: '',
      },
      description: '',
      showOnMain: false,
      mainSlider: false,
      section: {
        id: 0,
        name: '',
      },
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
