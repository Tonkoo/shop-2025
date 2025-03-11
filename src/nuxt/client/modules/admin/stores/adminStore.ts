import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
import { useAdminModule } from '~/modules/admin/global';
import type {
  formParentSection,
  Product,
  Search,
  Section,
  TypeSearch,
} from '~/interfaces/global';

const adminModule = useAdminModule();

export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => ({
    items: [],
    viewModal: false,
    typeItem: 'section',
    countColumn: 10,
    currentPage: 1,
    allCount: 0,
    typeSearch: { label: 'Разделы', value: 'section' },
    allName: [],
    searchName: { name: '' },
    formNameSection: '',
    formParentSection: { id: 0, name: '' },
    formFile: [],
  }),
  actions: {
    setViewModal(value: boolean) {
      this.viewModal = value;
    },
    setTypeItem(value: string) {
      this.typeItem = value;
    },
    async setCountColumn(value: string) {
      const newCount = parseInt(value);
      if (this.countColumn !== newCount) {
        this.countColumn = newCount;
        await this.getItems();
      }
    },
    async setCurrentPage(value: number) {
      this.currentPage = value;
      await this.getItems();
    },
    async setTypeSearch(value: TypeSearch) {
      this.typeSearch = value;
    },
    setSearchName(value: Search) {
      this.searchName = value;
    },
    setFormNameSection(value: string) {
      this.formNameSection = value;
    },
    setFormParentSection(value: formParentSection) {
      this.formParentSection = value;
    },
    setFormFile(value: File[]) {
      this.formFile = value;
    },
    setAllCount(value: number) {
      this.allCount = value;
    },
    async getItems() {
      try {
        this.items = (await adminModule.getColumn()) as Section[] | Product[];
      } catch (err) {
        console.error(
          'Error when receiving "Sections" data from the server:',
          err
        );
      }
    },
    async getNameItems() {
      try {
        this.allName = await adminModule.getAllNameColumn();
      } catch (err) {
        console.error(
          'Error when receiving "Sections" data from the server:',
          err
        );
      }
    },
    clearForms() {
      this.setViewModal(false);
      this.setFormNameSection('');
      this.setFormFile([]);
      this.setFormParentSection({ id: 0, name: '' });
    },
  },
});
