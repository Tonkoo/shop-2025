import { api } from '#shared/api/axios.js';

export async function getSection() {
  try {
    //TODO: Exception
    const response = await api.get('/section');
    return response.data.data;
  } catch (err) {
    console.error('Failed to fetch data from the server ' + err);
    throw new Error('Error while fetching section data from the server.');
  }
}
