import { api } from '#shared/api/axios.js';
import type { Product, resultItems, Section } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export async function getColumn(): Promise<Section[] | Product[]> {
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
    const { items, total } = response.data.data[0];
    adminStore.setAllCount(total);
    return items;
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
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}

export async function addSection() {
  const adminStore = useAdminStore();
  try {
    adminStore.setSearchName('');
    const formData = new FormData();

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
    const { items, total } = response.data.data[0];
    adminStore.setAllCount(total);
    return items;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
