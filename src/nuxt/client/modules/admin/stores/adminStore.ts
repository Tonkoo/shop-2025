import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => ({
    sectionItems: [],
    viewModal: false,
  }),
  actions: {
    // setItems(data: TapeFashions[]) {
    //   this.fashions = data;
    // },
    setViewModal(value: boolean) {
      this.viewModal = value;
      console.log(this.viewModal);
    },
  },
});
