import { api } from '#shared/api/axios.js';

export async function getSection() {
  try {
    return api.get('/section');
  } catch (err) {
    console.log(err);
  }
}
