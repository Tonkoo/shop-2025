import { defineStore } from 'pinia';
import type { AdminState } from '~/modules/admin/types/types';
import { useAdminModule } from '~/modules/admin/global';
import type {
  SelectSection,
  Search,
  TypeSearch,
  ProductAdmin,
  SectionAdmin,
  Colors,
  Err,
  SelectColor,
} from '~/interfaces/adminGlobal';
import type { ResultItemsAdmin } from '~/interfaces/resultGlobal';
import { convertFile } from '~/modules/admin/utils/convertFile.util';
import { paramPagination } from '~/entities/table.entites';
import { sectionDefault, sectionFormDefault } from '~/entities/section.entites';
import { colorFormDefault, productDefault } from '~/entities/product.entites';
import { typeSearchDefault } from '~/entities/search.entites';

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
    typeSearch: { ...typeSearchDefault },
    allName: [],
    searchName: '',
    searchParentName: '',
    searchSection: '',
    selectedId: 0,
    backSection: null,
    backProduct: null,
    frontSection: { ...sectionDefault },
    sectionForm: { ...sectionFormDefault },
    frontProduct: { ...productDefault },
    colorForm: { ...colorFormDefault },
    errors: {},
    disableBtn: false,
    filterSection: null,
    itemsFilter: [],
    nameColumnSection: '',
    colors: [],
  }),
  actions: {
    setIsEdit(value: boolean) {
      this.isEdit = value;
    },
    async setViewModal(value: boolean) {
      if (!value) {
        this.clearForms();
      }
      this.clearError();
      this.viewModal = value;
    },
    setDelDialog(value: boolean) {
      this.delDialog = value;
    },
    setTypeItem(value: string, clear: boolean) {
      this.typeItem = value;
      if (clear) {
        this.clearForms();
      }
      this.clearError();
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
    setNameColumnSection(value: string) {
      this.nameColumnSection = value;
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
    async setFrontSection(value: SectionAdmin) {
      this.frontSection = {
        ...value,
        images: await convertFile(value.imageObject),
      };
      if (value.parent) {
        this.setSectionForm(value.parent);
      }
    },
    async setBackSection(value: SectionAdmin) {
      this.backSection = {
        ...value,
        images: await convertFile(value.imageObject),
      };
      await this.setFrontSection(value);
    },
    async setFrontProduct(value: ProductAdmin) {
      this.frontProduct = {
        ...value,
        images: await convertFile(value.imageObject),
      };
    },
    async setBackProduct(value: ProductAdmin) {
      this.backProduct = {
        ...value,
        images: await convertFile(value.imageObject),
      };
      await this.setFrontProduct(value);
      if (value.section) {
        this.setSectionForm(value.section);
      }
      if (value.color) {
        this.setColorForm(value.color);
      }
    },
    clearForms() {
      this.setIsEdit(false);
      this.frontSection = { ...sectionDefault };
      this.frontProduct = { ...productDefault };
      this.sectionForm = { ...sectionFormDefault };
      this.colorForm = { ...colorFormDefault };
    },
    setSectionName(value: string) {
      this.frontSection.name = value;
    },
    setSectionImages(value: File[]) {
      this.frontSection.images = value;
    },
    setSectionIdParent(value: number) {
      this.frontSection.idParent = value;
    },
    setSectionForm(value: SelectSection) {
      this.sectionForm = value;
    },
    setColorForm(value: SelectColor) {
      this.colorForm = value;
    },
    setError(value: Err) {
      this.errors = value;
    },
    clearError() {
      this.errors = {};
    },
    setProductName(value: string) {
      this.frontProduct.name = value;
    },
    setProductImages(value: File[]) {
      this.frontProduct.images = value;
    },
    setProductPrice(value: number) {
      this.frontProduct.price = Number(value);
    },
    setProductColor(value: SelectColor) {
      this.frontProduct.idColor = value.id;
    },
    setProductDescription(value: string) {
      this.frontProduct.description = value;
    },
    setProductIdSection(value: SelectSection) {
      this.frontProduct.idSection = value.id;
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
    setItemsFilter(value: Search[]) {
      this.itemsFilter = value;
    },
    setColors(value: Colors[]) {
      this.colors = value;
    },
  },
});
