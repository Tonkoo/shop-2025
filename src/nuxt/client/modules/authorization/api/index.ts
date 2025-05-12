import { api } from '#shared/api/axios';
import { useAuthorizationStore } from '~/modules/authorization/stores/authorizationStore';
import type { AuthorizationResponse } from '~/interfaces/resultGlobal';

export async function authorizationUser() {
  const authorizationStore = useAuthorizationStore();
  try {
    const body = new URLSearchParams();
    body.append('grant_type', 'password');
    body.append('client_secret', 'xX8RYq6OqRtwS19X021MT6Y4ZBMnMLSD');
    body.append('client_id', 'shop-admin-client');
    body.append('username', authorizationStore.user.username);
    body.append('password', authorizationStore.user.password);
    body.append('scope', 'openid');

    const response = await api.post<AuthorizationResponse>(
      'http://localhost/realms/shop-admin/protocol/openid-connect/token',
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = useCookie('access_token', {
      maxAge: response.data.expires_in,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    const refreshToken = useCookie('refresh_token', {
      maxAge: response.data.expires_in,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    accessToken.value = response.data.access_token;
    refreshToken.value = response.data.refresh_token;
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
