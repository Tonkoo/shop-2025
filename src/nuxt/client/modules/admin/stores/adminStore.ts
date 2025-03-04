import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
import { useAdminModule } from '~/modules/admin/global';
import type { Section } from '~/interfaces/global';

const adminModule = useAdminModule();

export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => ({
    sectionItems: [],
    viewModal: false,
    typeItem: 'section',
    countColumn: 10,
    currentPage: 1,
    AllCount: 0,
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
        this.getSectionItems();
      }
    },
    setCurrentPage(value: number) {
      this.currentPage = value;
      this.getSectionItems();
    },
    async getSectionItems() {
      try {
        this.sectionItems = (await adminModule.getSection()) as Section[];
        this.getCountSectionItems();
      } catch (err) {
        console.error(
          'Error when receiving "Sections" data from the server:',
          err
        );
      }
    },
    async getCountSectionItems() {
      try {
        this.AllCount = await adminModule.getAllCountColumn('section');
      } catch (err) {
        console.error(
          'Error when receiving "Sections" data from the server:',
          err
        );
      }
    },
  },
});
