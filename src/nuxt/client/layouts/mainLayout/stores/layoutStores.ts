import { defineStore } from 'pinia';
import type { SectionMain } from '~/interfaces/global';
import type { LayoutType } from '~/layouts/mainLayout/type/types';

export const useLayoutStores = defineStore('layout-store', {
  state: (): LayoutType => ({
    sidebar: false,
    menu: [],
    typePage: '',
    pathPage: '',
  }),
  actions: {
    setSidebar() {
      if (!this.sidebar) {
        this.sidebar = true;
        return;
      }
      this.sidebar = false;
    },
    setMenu(value: SectionMain[]) {
      this.menu = value;
    },
    setTypePage(value: string) {
      this.typePage = value;
    },
    setPathPage(value: string) {
      this.pathPage = value;
    },
  },
});
