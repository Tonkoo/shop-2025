import { api } from '~~/shared/api/axios';
import type { ResultItemsAdmin, ApiParams } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { comparisonValues } from '~/modules/admin/composables/сomparisonValues';
import { headers } from '~/composables/customFetch';
import { generateFormData } from '~/modules/admin/utils/prepareFormData.util';

function removeDots(data: string): string {
  if (!data) {
    return data;
  }
  return data.replace(/^\.+/g, '');
}
function validateForm() {
  const adminStore = useAdminStore();
  const { typeItem, frontSection, frontProduct } = adminStore;
  let isValid = true;

  adminStore.setClearError();

  if (typeItem === 'section') {
    if (!frontSection.name.trim()) {
      adminStore.setErrorName(true);
      isValid = false;
    }
  } else {
    if (!frontProduct.name.trim()) {
      adminStore.setErrorName(true);
      isValid = false;
    }

    if (!frontProduct.price) {
      adminStore.setErrorPrice(true);
      isValid = false;
    }

    if (!frontProduct.color.trim()) {
      adminStore.setErrorColor(true);
      isValid = false;
    }

    if (!frontProduct.description.trim()) {
      adminStore.setErrorDescription(true);
      isValid = false;
    }

    if (!frontProduct.section?.id || !frontProduct.section?.name.trim()) {
      adminStore.setErrorSection(true);
      isValid = false;
    }
  }

  if (!isValid) {
    throw new Error('The form is filled in incorrectly');
  }
}

function fillingParam(
  type: string,
  from: string | number,
  size: string | number,
  searchName: string,
  filterSection?: number,
  typeItem?: string,
  getItem?: boolean,
  isSearch?: boolean
) {
  const params: ApiParams = {
    type,
    from,
    size,
    searchName,
  };
  if (filterSection) {
    params.filterSection = filterSection;
  }
  // if (getItem && typeItem && typeItem === 'product') {
  //   params.type = 'section';
  // }
  if (getItem) {
    if (typeItem === 'section') {
      params.getSection = getItem;
    } else {
      params.getProduct = getItem;
    }
  }
  if (!isSearch) {
    params.typeForm = typeItem;
  }
  return params;
}

export async function reindex() {
  try {
    const adminStore = useAdminStore();
    const params = fillingParam(
      adminStore.typeSearch.value,
      (adminStore.currentPage - 1) * adminStore.countColumn,
      adminStore.countColumn,
      adminStore.searchName
    );
    adminStore.setTypeItem(adminStore.typeSearch.value);
    const response = await api.get<{ data: ResultItemsAdmin[] }>(
      '/elastic/reindex',
      {
        params,
      }
    );
    if (!response) {
      throw new Error('Indexing error');
    }

    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error('Indexing error ' + err);
    throw new Error('Indexing error.');
  }
}

export async function getItems() {
  const adminStore = useAdminStore();
  try {
    const params = fillingParam(
      adminStore.typeSearch.value,
      (adminStore.currentPage - 1) * adminStore.countColumn,
      adminStore.countColumn,
      removeDots(adminStore.searchName),
      adminStore.filterSection?.id
    );

    // adminStore.setTypeItem(adminStore.typeSearch.value);
    const response = await api.get<{ data: ResultItemsAdmin[] }>(
      '/elastic/admin',
      {
        params,
      }
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    // if (adminStore.typeSearch.value == 'section') {
    //   adminStore.setItemsFilter(response.data.data[0]);
    // }
    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}

export async function getAllNameColumn() {
  const adminStore = useAdminStore();
  try {
    const params = fillingParam(
      adminStore.isAddEdit ? 'section' : adminStore.typeSearch.value,
      '',
      adminStore.countColumn,
      removeDots(adminStore.searchName) ??
        removeDots(adminStore.searchParentName) ??
        removeDots(adminStore.searchSection) ??
        '',
      undefined,
      adminStore.typeItem,
      undefined,
      adminStore.isSearch
    );
    const response = await api.get('/elastic/admin/name', {
      params,
    });
    if (!response) {
      throw new Error('Error while receiving data');
    }
    adminStore.setIsSearch(false);
    adminStore.setNameItems(response.data.data);
  } catch (err) {
    console.error(err);
  }
}

export async function addItem() {
  const adminStore = useAdminStore();
  try {
    adminStore.setSearchName('');
    const formData = new FormData();
    const param: ApiParams = fillingParam(
      adminStore.typeSearch.value,
      ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
      adminStore.countColumn.toString(),
      removeDots(adminStore.searchName),
      undefined,
      adminStore.typeItem,
      true
    );
    validateForm();
    let data;
    if (adminStore.typeItem === 'section') {
      data = adminStore.frontSection;
    } else {
      data = adminStore.frontProduct;
    }
    generateFormData(formData, data, param);

    const response = await api.post<{ data: ResultItemsAdmin[] }>(
      `/${adminStore.typeItem}`,
      formData,
      headers
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editItem() {
  const adminStore = useAdminStore();
  try {
    let data;
    if (adminStore.typeItem === 'section') {
      data = comparisonValues(adminStore.frontSection, adminStore.backSection, [
        'id',
        'level',
        'code',
      ]);
    } else {
      data = comparisonValues(adminStore.frontProduct, adminStore.backProduct, [
        'id',
        'code',
        'idSection',
        'sectionName',
        'sectionId',
      ]);
    }
    if (data.section) {
      data.sectionId = data.section.id;
      data.sectionName = data.section.name;
    }
    if (data.parent) {
      data.idParent = data.parent.id;
    }

    const formData = new FormData();
    const param: ApiParams = fillingParam(
      adminStore.typeSearch.value,
      ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
      adminStore.countColumn.toString(),
      adminStore.searchName,
      undefined,
      adminStore.typeItem,
      true
    );

    validateForm();

    generateFormData(formData, data, param);
    adminStore.setSearchName('');
    const response = await api.put<{ data: ResultItemsAdmin[] }>(
      `/${adminStore.typeItem}/${adminStore.selectedId}`,
      formData,
      headers
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getItemById() {
  const adminStore = useAdminStore();
  const params = {
    id: adminStore.selectedId,
  };
  try {
    const response = await api.get(`/${adminStore.typeSearch.value}/id`, {
      params: params,
    });
    if (!response) {
      throw new Error('Error while receiving data');
    }
    if (adminStore.typeSearch.value == 'section') {
      await adminStore.setBackSection(response.data.data);
    } else {
      await adminStore.setBackProduct(response.data.data);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function delItem() {
  const adminStore = useAdminStore();
  const params: ApiParams = fillingParam(
    adminStore.typeSearch.value,
    ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
    adminStore.countColumn.toString(),
    adminStore.searchName,
    undefined,
    adminStore.typeItem,
    true
  );
  try {
    const response = await api.delete<{ data: ResultItemsAdmin[] }>(
      `/${adminStore.typeSearch.value}/${adminStore.selectedId}`,
      { params }
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
