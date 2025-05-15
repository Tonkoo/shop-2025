import { api } from '#shared/api/axios';
import { useAuthorizationStore } from '~/modules/authorization/stores/authorizationStore';
import type {
  AuthorizationResponse,
  ResponseIntrospect,
} from '~/interfaces/resultGlobal';

export async function authorizationUser() {
  const authorizationStore = useAuthorizationStore();
  try {
    const response = await api.post<AuthorizationResponse>(
      `/auth/login`,
      authorizationStore.user
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function introspect() {
  try {
    const response = await api.post<ResponseIntrospect>(`/auth/introspect`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function refreshToken() {
  try {
    const response = await api.post<AuthorizationResponse>(`/auth/refresh`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
