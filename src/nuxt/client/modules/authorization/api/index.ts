import { api } from '#shared/api/axios';
import { useAuthorizationStore } from '~/modules/authorization/stores/authorizationStore';
import type {
  AuthorizationResponse,
  ResponseIntrospect,
} from '~/interfaces/resultGlobal';
import { headersAuth } from '~/composables/customFetch';

export async function authorizationUser() {
  const authorizationStore = useAuthorizationStore();
  try {
    const response = await api.post<AuthorizationResponse>(
      `/auth/login`,
      authorizationStore.user
    );
    sessionStorage.setItem('access_token', response.data.access_token);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function introspect() {
  try {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      return { active: false };
    }
    const response = await api.post<ResponseIntrospect>(
      `/auth/introspect`,
      {},
      {
        headers: headersAuth(accessToken),
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function refreshToken() {
  try {
    const response = await api.post<AuthorizationResponse>(`/auth/refresh`);
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
