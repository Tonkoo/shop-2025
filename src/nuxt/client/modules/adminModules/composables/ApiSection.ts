import { api } from '#shared/api/axios.js';

export async function getSection() {
  try {
    const response = await api.get('/section');
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
