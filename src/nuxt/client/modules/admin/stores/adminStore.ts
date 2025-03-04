import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
import { useAdminModule } from '~/modules/admin/global';
import type { Section } from "~/interfaces/global";


const adminModule = useAdminModule();

export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => ({
    sectionItems: [],
    viewModal: false,
    typeItem: 'section',
  }),
  actions: {
    setViewModal(value: boolean) {
      this.viewModal = value;
    },
    setTypeItem(value: string) {
      this.typeItem = value;
    },
    async getSectionItems() {
      try {
       this.sectionItems= await adminModule.getSection() as Section[];
      } catch (err) {
        console.error('Error when receiving "Sections" data from the server:', err);
      }
    },
  }
});
