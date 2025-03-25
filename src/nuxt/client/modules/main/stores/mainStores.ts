import { defineStore } from 'pinia';
import type { MainType } from '~/modules/main/type/types';
import type { ResultItems, Section } from '~/interfaces/global';

export const useMainStores = defineStore('main-store', {
  state: (): MainType => ({
    sidebar: false,
    itemsFooter: [],
    menuSection: [],
  }),
  actions: {
    setSidebar() {
      if (!this.sidebar) {
        this.sidebar = true;
        return;
      }
      this.sidebar = false;
    },
    setItemsFooter(value: ResultItems) {
      this.itemsFooter = value.items;
    },
    setMenuSection(value: ResultItems) {
      this.menuSection = value.items;
    },
  },
});
