import { api } from '#shared/api/axios';
import type { ResultItems } from '~/interfaces/global';
import { useMainStores } from '~/modules/main/stores/mainStores';

export async function getSection() {
  try {
    const mainStores = useMainStores();

    const params = {
      type: 'section',
    };

    const response = await api.get<{ data: ResultItems[] }>('/elastic/admin/', {
      params,
    });
    if (!response) {
      throw new Error('Error while receiving data');
    }
    mainStores.setSection(response.data.data[0]);
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}
