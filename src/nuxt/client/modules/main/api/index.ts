import { api } from '#shared/api/axios';
import type { ResultItemsMain } from '~/interfaces/global';
import { useMainStores } from '~/modules/main/stores/mainStores';

export async function getSection() {
  try {
    const mainStores = useMainStores();

    const params = {
      type: 'section',
      from: 0,
      size: 100,
    };

    const response = await api.get<{ data: ResultItemsMain[] }>(
      '/elastic/admin/',
      {
        params,
      }
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    mainStores.setSection(response.data.data[0]);
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}

export async function getProduct() {
  try {
    const mainStores = useMainStores();

    const params = {
      type: 'product',
      from: 0,
      size: 100,
    };

    const response = await api.get<{ data: ResultItemsMain[] }>(
      '/elastic/admin/',
      {
        params,
      }
    );
    if (!response) {
      throw new Error('Error while receiving data');
    }
    mainStores.setProduct(response.data.data[0]);
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}
