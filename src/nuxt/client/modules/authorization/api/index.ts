import { api } from '#shared/api/axios';
import { useAuthorizationStore } from '~/modules/authorization/stores/authorizationStore';

export async function authorizationUser() {
  const authorizationStore = useAuthorizationStore();
  try {
    const response = await api.post(`/auth/login`, authorizationStore.user);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
