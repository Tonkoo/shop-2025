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
    let accessToken = sessionStorage.getItem('access_token');

    if (!accessToken) {
      try {
        const refreshResponse = await refreshToken();
        if (!refreshResponse.success) {
          return { active: false };
        }
        accessToken = refreshResponse.access_token;
        sessionStorage.setItem('access_token', accessToken);
      } catch {
        return { active: false };
      }
    }
    const response = await api.post<ResponseIntrospect>(
      `/auth/introspect`,
      {},
      {
        headers: headersAuth(accessToken as string),
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function refreshToken() {
  try {
    const response = await api.post<AuthorizationResponse>(`/auth/refresh`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
