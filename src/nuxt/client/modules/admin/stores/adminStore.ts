import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
import { useAdminModule } from '~/modules/admin/global';
import type {
  ParentSection,
  resultItems,
  Search,
  Section,
  SectionBack,
  typeFile,
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
    searchParentName: '',
    selectedId: 0,
    selectedSection: null,
    section: {
      id: 0,
      code: '',
      name: '',
      images: [],
      id_parent: null,
    },
    sectionBackend: {
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
    setSearchParentName(value: string) {
      this.searchParentName = value;
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
      this.setSectionName(value.name);
      this.setSectionParent(value.parent ?? { id: 0, name: '' });
      await convertFile(value.imageObject);
    },
    clearForms() {
      this.setIsEdit(false);
      this.setSectionName('');
      this.setSectionImages([]);
      this.setSectionParent({
        id: 0,
        name: '',
      });
      this.setSearchParentName('');
      this.setSectionIdParent({ id: 0, name: '' });
    },
    setSectionName(value: string) {
      this.section.name = value;
    },
    setSectionImages(value: File[]) {
      this.section.images = value;
      console.log(this.section.images);
    },
    setSectionIdParent(value: ParentSection) {
      this.section.id_parent = value.id;
    },
    setSectionParent(value: ParentSection) {
      if (this.section.parent) {
        this.section.parent.id = value.id;
        this.section.parent.name = value.name;
      } else {
        this.section.parent = { id: value.id, name: value.name };
      }
    },
    setSectionBack(value: SectionBack) {
      this.sectionBackend = value;
    },
  },
});
