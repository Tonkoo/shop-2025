import { api } from '~~/shared/api/axios';
import type { ResultItems, ApiParams } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { comparisonValues } from '~/modules/admin/composables/сomparisonValues';
import { headers } from '~/composables/customFetch';
import { generateFormData } from '~/modules/admin/utils/prepareFormData.util';

function fillingParam(
  type: string,
  from: string | number,
  size: string | number,
  searchName: string,
  typeItem?: string,
  getItem?: boolean
) {
  const params: ApiParams = {
    type,
    from,
    size,
    searchName,
  };
  if (getItem) {
    if (typeItem === 'section') {
      params.getSection = getItem;
    } else {
      params.getProduct = getItem;
    }
  }

  return params;
}

export async function getItems() {
  const adminStore = useAdminStore();
  try {
    const params = fillingParam(
      adminStore.typeSearch.value,
      (adminStore.currentPage - 1) * adminStore.countColumn,
      adminStore.countColumn,
      adminStore.searchName
    );
    const response = await api.get<{ data: ResultItems[] }>('/elastic/admin', {
      params,
    });
    if (!response) {
      throw new Error('Error while receiving data');
    }
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
      adminStore.typeSearch.value,
      '',
      adminStore.countColumn,
      adminStore.searchName
        ? adminStore.searchName
        : adminStore.searchParentName
          ? adminStore.searchParentName
          : adminStore.searchSection
    );
    const response = await api.get('/elastic/admin/name', {
      params,
    });
    if (!response) {
      throw new Error('Error while receiving data');
    }
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
      adminStore.searchName,
      adminStore.typeItem,
      true
    );
    console.log(param);
    // if (adminStore.frontSection.name == '') {
    //   adminStore.setErrorName(true);
    //   throw new Error('The form is filled in incorrectly');
    // }
    adminStore.setErrorName(false);
    let data;
    if (adminStore.typeItem === 'section') {
      data = adminStore.frontSection;
    } else {
      data = adminStore.frontProduct;
    }
    console.log(data);
    generateFormData(formData, data, param);

    const response = await api.post<{ data: ResultItems[] }>(
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
      data = comparisonValues(adminStore.frontSection, adminStore.backSection);
    } else {
      data = comparisonValues(adminStore.frontProduct, adminStore.backProduct);
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
      adminStore.typeItem,
      true
    );
    // if (adminStore.frontSection.name == '') {
    //   adminStore.setErrorName(true);
    //   throw new Error('The form is filled in incorrectly');
    // }

    generateFormData(formData, data, param);
    adminStore.setSearchName('');
    const response = await api.put<{ data: ResultItems[] }>(
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

export async function getItem() {
  const adminStore = useAdminStore();
  const params = {
    id: adminStore.selectedId,
  };
  try {
    const response = await api.get(`/${adminStore.typeSearch.value}`, {
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
    adminStore.typeItem,
    true
  );
  try {
    const response = await api.delete<{ data: ResultItems[] }>(
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
