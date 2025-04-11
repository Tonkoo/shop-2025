import { defineStore } from 'pinia';
import type { MainType } from '~/modules/main/type/types';
import type { ResultItemsMain } from '~/interfaces/global';

export const useMainStores = defineStore('main-store', {
  state: (): MainType => ({
    mainGifts: [],
    mainSlider: [],
  }),
  actions: {
    setItems(value: ResultItemsMain) {
      this.mainGifts = value.content.mainGifts;
      this.mainSlider = value.content.mainSlider;
    },
  },
});
