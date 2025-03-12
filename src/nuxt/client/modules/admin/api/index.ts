import { api } from '#shared/api/axios.js';
import type { Product, resultItems, Section } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

// Promise<Section[] | Product[]>
export async function getItems() {
  const adminStore = useAdminStore();
  try {
    const params = {
      type: adminStore.typeSearch.value,
      from: (adminStore.currentPage - 1) * adminStore.countColumn,
      size: adminStore.countColumn,
      searchName: adminStore.searchName,
    };
    const response = await api.get<{ data: resultItems[] }>('/elastic/admin', {
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
      name: adminStore.searchName,
    };
    const response = await api.get('/elastic/admin/name', {
      params,
    });
    adminStore.setNameItems(response.data.data);
    // return response.data.data;
  } catch (err) {
    console.error(err);
  }
}

export async function addSection() {
  const adminStore = useAdminStore();
  try {
    adminStore.setSearchName('');
    const formData = new FormData();

    const param = {
      name: adminStore.formNameSection,
      idParent: adminStore.formParentSection.id.toString(),
      getSection: true,
      type: adminStore.typeSearch.value,
      from: ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
      size: adminStore.countColumn.toString(),
      searchName: adminStore.searchName,
    };
    //
    // Object.entries()

    formData.append('name', adminStore.formNameSection);
    formData.append('idParent', adminStore.formParentSection.id.toString());
    formData.append('getSection', 'true');
    formData.append('type', adminStore.typeSearch.value);
    formData.append(
      'from',
      ((adminStore.currentPage - 1) * adminStore.countColumn).toString()
    );
    formData.append('size', adminStore.countColumn.toString());
    formData.append('searchName', adminStore.searchName);

    adminStore.formFile.forEach((file) => {
      formData.append('files', file);
    });

    const response = await api.post<{ data: resultItems[] }>(
      '/section',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
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

    adminStore.setSelectedSection(response.data.data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
