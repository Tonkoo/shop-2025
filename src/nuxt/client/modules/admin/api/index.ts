import { api } from '#shared/api/axios.js';
import type { Section } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export async function getSection(): Promise<Section[]> {
  const adminStore = useAdminStore();
  try {
    const params = {
      type: 'section',
      from: 0,
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
