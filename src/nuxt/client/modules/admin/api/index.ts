import { api } from '#shared/api/axios.js';
import type { Section } from '~/interfaces/global';

export async function getSection(): Promise<Section[]> {
  try {
    //TODO: Exception
    const response = await api.get<{ data: Section[] }>(
      '/elastic/admin?type=section'
    );
    return response.data.data;
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}
