import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
import { useAdminModule } from '~/modules/admin/global';
import type {
  ParentSection,
  resultItems,
  Search,
  Section,
  TypeSearch,
} from '~/interfaces/global';
import { convertFile } from '~/modules/admin/utils/convertFile.util';

const adminModule = useAdminModule();

export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => ({
    isEdit: false,
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
    section: {
      id: 0,
      code: '',
      name: '',
      images: [],
      id_parent: null,
    },
  }),
  actions: {
    setIsEdit(value: boolean) {
      this.isEdit = value;
    },
    setViewModal(value: boolean) {
      if (!value) {
        this.clearForms();
      }

      this.viewModal = value;
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
    setFormParentSection(value: ParentSection) {
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
      this.setIsEdit(false);
      this.setFormNameSection('');
      this.setFormFile([]);
      this.setFormParentSection({ id: 0, name: '' });
    },
    setSectionName(value: string) {
      this.section.name = value;
    },
    setSectionImages(value: File[]) {
      this.section.images = value;
    },
    setSectionParent(value: ParentSection) {
      this.section.id_parent = value.id;
    },
  },
});
