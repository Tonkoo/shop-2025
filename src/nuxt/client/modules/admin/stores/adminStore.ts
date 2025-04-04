import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
import { useAdminModule } from '~/modules/admin/global';
import type {
  SelectSection,
  ResultItemsAdmin,
  Search,
  TypeSearch,
  ProductAdmin,
  SectionAdmin,
} from '~/interfaces/global';
import { convertFile } from '~/modules/admin/utils/convertFile.util';
import { getItemById } from '~/modules/admin/api';
import { paramPagination } from '~/entities/table.entites';

const adminModule = useAdminModule();
export const useAdminStore = defineStore('admin-store', {
  state: (): AdminState => ({
    isEdit: false,
    items: [],
    delDialog: false,
    viewModal: false,
    typeItem: 'section',
    countColumn: paramPagination.countColumn,
    currentPage: paramPagination.currentPage,
    allCount: 0,
    typeSearch: { label: 'Разделы', value: 'section' },
    allName: [],
    searchName: '',
    searchParentName: '',
    searchSection: '',
    selectedId: 0,
    backSection: null,
    backProduct: null,
    frontSection: {
      id: 0,
      code: '',
      name: '',
      images: [],
      idParent: null,
      level: 1,
    },
    frontProduct: {
      id: 0,
      code: '',
      name: '',
      images: [],
      price: '',
      color: '',
      section: {
        id: 0,
        name: '',
      },
      description: '',
      idSection: null,
      showOnMain: false,
      mainSlider: false,
    },
    errors: {
      name: false,
      price: false,
      color: false,
      description: false,
      section: false,
    },
    disableBtn: false,
    filterSection: null,
    itemsFilter: [],
    isAddEdit: false,
    isSearch: false,
  }),
  actions: {
    setIsEdit(value: boolean) {
      this.isEdit = value;
    },
    async setViewModal(value: boolean) {
      if (!value) {
        await this.clearForms();
      }
      this.setIsAddEdit(false);
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
    setSearchSection(value: string) {
      this.searchSection = value;
    },
    setDataItems(data: ResultItemsAdmin) {
      this.items = data.items;
      this.allCount = data.total;
    },
    setDisableBtn(value: boolean) {
      this.disableBtn = value;
    },
    async setSelectedId(value: number) {
      this.selectedId = value;
      await adminModule.getItemById();
    },
    async setSelectedIdDel(value: number) {
      this.selectedId = value;
    },
    setNameItems(value: Search[]) {
      this.allName = value;
    },
    async setBackSection(value: SectionAdmin) {
      this.backSection = value;
      if (!this.backSection.idParent) {
        this.backSection.idParent = 0;
      }
      this.setSectionId(value.id);
      this.setSectionName(value.name);
      this.setSectionParent(value.parent ?? { id: 0, name: '' });
      this.setSectionIdParent(value.parent ?? { id: 0, name: '' });
      await convertFile(value.imageObject);
    },
    async setBackProduct(value: ProductAdmin) {
      this.backProduct = value;
      if (this.backProduct.price) {
        this.backProduct.price = String(this.backProduct.price);
      }
      this.setProductName(value.name);
      await convertFile(value.imageObject);
      this.setProductPrice(value.price);
      this.setProductColor(value.color);
      this.setProductDescription(value.description);
      this.setProductSection(value.section ?? { id: 0, name: '' });
      this.setProductShowOnMain(value.showOnMain);
      this.setProductMainSlider(value.mainSlider);
    },
    async clearForms() {
      this.setIsEdit(false);
      this.setSectionName('');
      this.setSectionImages([]);
      this.setSectionParent({
        id: 0,
        name: '',
      });
      this.setSearchParentName('');
      this.setSectionIdParent({ id: 0, name: '' });
      this.setProductName('');
      this.setProductImages([]);
      this.setProductPrice('');
      this.setProductColor('');
      this.setProductDescription('');
      this.setProductSection({
        id: 0,
        name: '',
      });
      this.setProductShowOnMain(false);
      this.setProductMainSlider(false);
    },
    setSectionId(value: number) {
      this.frontSection.id = value;
    },
    setSectionName(value: string) {
      this.frontSection.name = value;
    },
    setSectionImages(value: File[]) {
      this.frontSection.images = value;
    },
    setSectionIdParent(value: SelectSection) {
      this.frontSection.idParent = value.id;
    },
    setSectionParent(value: SelectSection) {
      this.frontSection.parent = { id: value.id, name: value.name };
    },
    setConvertImages(value: File[]) {
      if (this.backSection) {
        this.backSection.images = value;
      }
      if (this.backProduct) {
        this.backProduct.images = value;
      }
    },
    setErrorName(value: boolean) {
      this.errors.name = value;
    },
    setErrorPrice(value: boolean) {
      this.errors.price = value;
    },
    setErrorColor(value: boolean) {
      this.errors.color = value;
    },
    setErrorDescription(value: boolean) {
      this.errors.description = value;
    },
    setErrorSection(value: boolean) {
      this.errors.section = value;
    },
    setClearError() {
      this.setErrorName(false);
      this.setErrorPrice(false);
      this.setErrorColor(false);
      this.setErrorDescription(false);
      this.setErrorSection(false);
    },
    setProductName(value: string) {
      this.frontProduct.name = value;
    },
    setProductImages(value: File[]) {
      this.frontProduct.images = value;
    },
    setProductPrice(value: string) {
      this.frontProduct.price = String(value);
    },
    setProductColor(value: string) {
      this.frontProduct.color = value;
    },
    setProductDescription(value: string) {
      this.frontProduct.description = value;
    },
    setProductIdSection(value: SelectSection) {
      this.frontProduct.idSection = value.id;
      this.frontProduct.sectionId = value.id;
      this.frontProduct.sectionName = value.name;
    },
    setProductSection(value: SelectSection) {
      this.frontProduct.section = { id: value.id, name: value.name };
    },
    setProductShowOnMain(value: boolean) {
      this.frontProduct.showOnMain = value;
    },
    setProductMainSlider(value: boolean) {
      this.frontProduct.mainSlider = value;
    },
    setFilterSection(value: SectionAdmin | null) {
      this.filterSection = value;
    },
    setItemsFilter(value: ResultItemsAdmin) {
      this.itemsFilter = value.items;
    },
    setIsAddEdit(value: boolean) {
      this.isAddEdit = value;
    },
    setIsSearch(value: boolean) {
      this.isSearch = value;
    },
  },
});
