import { api } from '~~/shared/api/axios';
import type { ResultItems, Param } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { comparisonValues } from '~/modules/admin/composables/сomparisonValues';
import { headers } from '~/composables/customFetch';
import { generateFormData } from '~/modules/admin/utils/prepareFormData.util';

export async function getItems() {
  const adminStore = useAdminStore();
  try {
    const params = {
      type: adminStore.typeSearch.value,
      from: (adminStore.currentPage - 1) * adminStore.countColumn,
      size: adminStore.countColumn,
      searchName: adminStore.searchName,
    };
    const response = await api.get<{ data: ResultItems[] }>('/elastic/admin', {
      params,
    });
    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}

export async function getAllNameColumn() {
  const adminStore = useAdminStore();
  try {
    const params = {
      type: adminStore.typeSearch.value,
      searchName: adminStore.searchName
        ? adminStore.searchName
        : adminStore.searchParentName,
      size: adminStore.countColumn,
    };
    const response = await api.get('/elastic/admin/name', {
      params,
    });
    adminStore.setNameItems(response.data.data);
  } catch (err) {
    console.error(err);
  }
}

export async function addSection() {
  const adminStore = useAdminStore();
  try {
    adminStore.setSearchName('');
    const formData = new FormData();
    const param: Param = {
      type: adminStore.typeItem,
      from: ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
      size: adminStore.countColumn.toString(),
      searchName: adminStore.searchName,
      getSection: true,
    };
    if (adminStore.frontSection.name == '') {
      adminStore.setErrorName(true);
      throw new Error('The form is filled in incorrectly');
    }
    adminStore.setErrorName(false);
    generateFormData(formData, adminStore.frontSection, param);

    const response = await api.post<{ data: ResultItems[] }>(
      '/section',
      formData,
      headers
    );
    // if(!response){
    //   throw new
    // }
    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function editSection() {
  const adminStore = useAdminStore();
  try {
    const editSection = comparisonValues(
      adminStore.frontSection,
      adminStore.backSection
    );
    const formData = new FormData();
    const param = {
      type: adminStore.typeItem,
      from: ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
      size: adminStore.countColumn.toString(),
      searchName: adminStore.searchName,
      getSection: true,
    };

    generateFormData(formData, editSection, param);

    adminStore.setSearchName('');
    const response = await api.put<{ data: ResultItems[] }>(
      `/section/${adminStore.backSection?.id}`,
      formData,
      headers
    );
    adminStore.setDataItems(response.data.data[0]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getSection() {
  const adminStore = useAdminStore();
  const params = {
    id: adminStore.selectedId,
  };
  try {
    const response = await api.get('/section', { params: params });
    await adminStore.setSelectedSection(response.data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
