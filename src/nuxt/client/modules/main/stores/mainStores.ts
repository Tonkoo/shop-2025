import { defineStore } from 'pinia';
import type { MainType } from '~/modules/main/type/types';
import type { ResultItems } from '~/interfaces/global';

export const useMainStores = defineStore('main-store', {
  state: (): MainType => ({
    itemsFooter: [],
  }),
  actions: {
    setItemsFooter(value: ResultItems) {
      this.itemsFooter = value.items;
      console.log(this.itemsFooter);
    },
  },
});
