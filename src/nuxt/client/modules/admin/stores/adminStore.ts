import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
import { useAdminModule } from '~/modules/admin/global';
import type {
  ParentSection,
  ResultItems,
  Search,
  Section,
  TypeSearch,
} from '~/interfaces/global';
import { convertFile } from '~/modules/admin/utils/convertFile.util';

const adminModule = useAdminModule();
//TODO: вынести параметры для пагинации в файл table.entites.
export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => ({
    isEdit: false,
    items: [],
    delDialog: false,
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
    backSection: null,
    frontSection: {
      id: 0,
      code: '',
      name: '',
      images: [],
      id_parent: null,
    },
    errors: { name: false },
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
    setDelDialog(value: boolean) {
      this.delDialog = value;
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
    setDataItems(data: ResultItems) {
      this.items = data.items;
      this.allCount = data.total;
    },
    async setSelectedId(value: number) {
      this.selectedId = value;
      this.frontSection.id = value;
      await adminModule.getSection();
    },
    setNameItems(value: Search[]) {
      this.allName = value;
    },
    async setSelectedSection(value: Section) {
      this.backSection = value;
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
      this.frontSection.name = value;
    },
    setSectionImages(value: File[]) {
      this.frontSection.images = value;
    },
    setSectionIdParent(value: ParentSection) {
      this.frontSection.id_parent = value.id;
    },
    setSectionParent(value: ParentSection) {
      this.frontSection.parent = { id: value.id, name: value.name };
    },
    setConvertSelectedSectionImages(value: File[]) {
      if (this.backSection) {
        this.backSection.images = value;
      }
    },
    setErrorName(value: boolean) {
      this.errors.name = value;
    },
  },
});
