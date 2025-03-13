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
      searchName: adminStore.searchName,
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
    const param = {
      type: adminStore.typeItem,
      from: ((adminStore.currentPage - 1) * adminStore.countColumn).toString(),
      size: adminStore.countColumn.toString(),
      searchName: adminStore.searchName,
      getSection: true,
    };

    Object.entries(adminStore.section).forEach(([key, value]) => {
      if (key === 'images') {
        (value as File[]).forEach((file) => {
          formData.append('files', file);
        });
      } else {
        formData.append(key, String(value));
      }
    });

    Object.entries(param).forEach(([key, value]) => {
      formData.append(key, String(value));
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

export async function editSection() {
  const adminStore = useAdminStore();
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
