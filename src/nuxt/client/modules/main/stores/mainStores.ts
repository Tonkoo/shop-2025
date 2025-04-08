import { defineStore } from 'pinia';
import type { MainType } from '~/modules/main/type/types';
import type { ResultItemsMain } from '~/interfaces/global';

export const useMainStores = defineStore('main-store', {
  state: (): MainType => ({
    sidebar: false,
    mainGifts: [],
    mainSlider: [],
    menu: [],
  }),
  actions: {
    setSidebar() {
      if (!this.sidebar) {
        this.sidebar = true;
        return;
      }
      this.sidebar = false;
    },
    setItems(value: ResultItemsMain) {
      this.mainGifts = value.content.mainGifts;
      this.mainSlider = value.content.mainSlider;
      this.menu = value.layout.menu;
    },
  },
});
