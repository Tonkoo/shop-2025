import { api } from '#shared/api/axios.js';
import type { Product, Section } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export async function getColumn(): Promise<Section[] | Product[]> {
  const adminStore = useAdminStore();
  try {
    const params = {
      type: adminStore.typeSearch.value,
      from: (adminStore.currentPage - 1) * adminStore.countColumn,
      size: adminStore.countColumn,
      name: adminStore.searchName.name,
    };
    const response = await api.get<{ data: Section[] | Product[] }>(
      '/elastic/admin',
      {
        params,
      }
    );
    return response.data.data;
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}

export async function getAllCountColumn() {
  const adminStore = useAdminStore();
  try {
    const params = {
      type: adminStore.typeSearch.value,
      name: adminStore.searchName.name,
    };
    const response = await api.get('/elastic/admin/count', {
      params,
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllNameColumn() {
  const adminStore = useAdminStore();
  try {
    const params = {
      type: adminStore.typeSearch.value,
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
    const formData = new FormData();

    formData.append('name', adminStore.formNameSection);
    formData.append('idParent', adminStore.formParentSection.id.toString());
    formData.append('getSection', 'true');

    adminStore.formFile.forEach((file) => {
      formData.append('files', file);
    });

    const response = await api.post('/section', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
