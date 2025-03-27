import { defineStore } from 'pinia';
import type { MainType } from '~/modules/main/type/types';
import type { ResultItems } from '~/interfaces/global';

export const useMainStores = defineStore('main-store', {
  state: (): MainType => ({
    sidebar: false,
    section: [],
    product: [],
  }),
  actions: {
    setSidebar() {
      if (!this.sidebar) {
        this.sidebar = true;
        return;
      }
      this.sidebar = false;
    },
    setSection(value: ResultItems) {
      this.section = value.items;
    },
    setProduct(value: ResultItems) {
      this.product = value.items;
      console.log(this.product);
    },
  },
});
