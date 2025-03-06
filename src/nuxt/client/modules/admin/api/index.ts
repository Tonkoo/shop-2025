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
