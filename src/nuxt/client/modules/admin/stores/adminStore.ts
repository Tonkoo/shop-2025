import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
import { useAdminModule } from '~/modules/admin/global';
import type { Product, Section, TypeSearch } from '~/interfaces/global';

const adminModule = useAdminModule();

export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => ({
    sectionItems: [],
    viewModal: false,
    typeItem: 'section',
    countColumn: 10,
    currentPage: 1,
    allCount: 0,
    typeSearch: { label: 'Разделы', value: 'section' },
  }),
  actions: {
    setViewModal(value: boolean) {
      this.viewModal = value;
    },
    setTypeItem(value: string) {
      this.typeItem = value;
    },
    setCountColumn(value: string) {
      const newCount = parseInt(value);
      if (this.countColumn !== newCount) {
        this.countColumn = newCount;
        this.getItems();
      }
    },
    setCurrentPage(value: number) {
      this.currentPage = value;
      this.getItems();
    },
    setTypeSearch(value: TypeSearch) {
      this.typeSearch = value;
    },
    async getItems() {
      try {
        this.sectionItems = (await adminModule.getColumn()) as
          | Section[]
          | Product[];
        this.getCountItems();
      } catch (err) {
        console.error(
          'Error when receiving "Sections" data from the server:',
          err
        );
      }
    },
    async getCountItems() {
      try {
        this.allCount = await adminModule.getAllCountColumn();
      } catch (err) {
        console.error(
          'Error when receiving "Sections" data from the server:',
          err
        );
      }
    },
  },
});
