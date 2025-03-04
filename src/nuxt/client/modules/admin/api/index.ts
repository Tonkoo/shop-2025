import { api } from '#shared/api/axios.js';
import type { Section } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export async function getSection(): Promise<Section[]> {
  const adminStore = useAdminStore();
  try {
    const params = {
      type: 'section',
      from: (adminStore.currentPage - 1) * adminStore.countColumn,
      size: adminStore.countColumn,
    };
    //TODO: Exception
    const response = await api.get<{ data: Section[] }>('/elastic/admin', {
      params,
    });
    return response.data.data;
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}

export async function getAllCountColumn(type: string) {
  try {
    const params = {
      type: type,
    };
    const response = await api.get('/elastic/admin/count', {
      params,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
}
