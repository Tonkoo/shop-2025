import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
import { useAdminModule } from '~/modules/admin/global';
import type {
  formParentSection,
  resultItems,
  Search,
  Section,
  TypeSearch,
} from '~/interfaces/global';
import { convertFile } from '~/modules/admin/utils/convertFile.util';

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
    searchName: '',
    formNameSection: '',
    formParentSection: { id: 0, name: '' },
    formFile: [],
    selectedId: 0,
    selectedSection: null,
  }),
  actions: {
    setViewModal(value: boolean) {
      this.viewModal = value;
      this.clearForms();
    },
    setTypeItem(value: string) {
      this.typeItem = value;
    },
    async setCountColumn(value: string) {
      const newCount: number = parseInt(value);
      if (this.countColumn !== newCount) {
        this.countColumn = newCount;
        await adminModule.getItems();
      }
    },
    async setCurrentPage(value: number) {
      this.currentPage = value;
      await adminModule.getItems();
    },
    setTypeSearch(value: TypeSearch) {
      this.typeSearch = value;
    },
    setSearchName(value: string) {
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
      console.log(this.formFile);
    },
    setDataItems(data: resultItems) {
      this.items = data.items;
      this.allCount = data.total;
    },
    async setSelectedId(value: number) {
      this.selectedId = value;
      await adminModule.getSection();
    },
    setNameItems(value: Search[]) {
      this.allName = value;
    },
    async setSelectedSection(value: Section) {
      this.setFormNameSection(value.name);
      this.setFormParentSection(value.parent ?? { id: 0, name: '' });
      await convertFile(value.imageObject);
    },
    clearForms() {
      this.setFormNameSection('');
      this.setFormFile([]);
      this.setFormParentSection({ id: 0, name: '' });
    },
  },
});
