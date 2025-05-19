import Keycloak from 'keycloak-js';
import { useAuthorizationModule } from '~/modules/authorization/global';
import { refreshToken as refreshTokenFn } from '~/modules/authorization/api';
import { api } from '#shared/api/axios';
import type { AuthorizationResponse } from '~/interfaces/resultGlobal';
import type { Timeout } from 'unenv/node/internal/timers/timeout';

function getTokenRefreshTime(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = payload.exp - now;
    return expiresIn <= 30 ? 0 : (expiresIn - 30) * 1000;
  } catch {
    return 0;
  }
}

async function refreshToken() {
  const runtimeConfig = useRuntimeConfig();
  try {
    const response = await $fetch<AuthorizationResponse>(
      `${runtimeConfig.public.baseURL}  auth/refresh`,
      { method: 'POST' }
    );
    if (!response) {
      throw new Error('No data');
    }
    return response;
  } catch (err) {
    console.error('Token update error:', err);
    throw err;
  }
}

export default defineNuxtPlugin(async (nuxtApp) => {
  let refreshTimeout: NodeJS.Timeout | null = null;
  const router = useRouter();

  const startIntervalRefreshToken = async () => {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      return;
    }

    if (refreshTimeout) {
      clearTimeout(refreshTimeout);
    }

    const refreshInMs = getTokenRefreshTime(accessToken);

    if (refreshInMs <= 0) {
      await refreshToken().then(async (response: AuthorizationResponse) => {
        if (!response.success) {
          sessionStorage.removeItem('access_token');
          await router.push('/authorization');
          return;
        }
        sessionStorage.setItem('access_token', response.access_token);
        await startIntervalRefreshToken();
      });
      return;
    }
    console.log(refreshInMs);
    refreshTimeout = setTimeout(async () => {
      await refreshToken().then(async (response: AuthorizationResponse) => {
        if (!response.success) {
          sessionStorage.removeItem('access_token');
          await router.push('/authorization');
          return;
        }
        sessionStorage.setItem('access_token', response.access_token);
        await startIntervalRefreshToken();
      });
    }, refreshInMs);
  };

  await startIntervalRefreshToken();

  // const token = useCookie('access_token');
  //
  // setInterval(async () => {
  //   try {
  //     const response = await $fetch<AuthorizationResponse>(
  //       `http://localhost/api/v1/auth/refresh`,
  //       {
  //         method: 'POST',
  //       }
  //     );
  //     console.log('testtetstetet');
  //     return response;
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
  // }, 250 * 1000);
  // const test = await refreshTokenFn();
  // const config = useRuntimeConfig();
  //
  // const keycloak = new Keycloak({
  //   url: config.public.keycloak.url,
  //   realm: config.public.keycloak.realm,
  //   clientId: config.public.keycloak.clientId,
  // });
  //
  // const authenticated = await keycloak.init({
  //   onLoad: 'check-sso',
  //   checkLoginIframe: true,
  //   silentCheckSsoRedirectUri:
  //     window.location.origin + '/silent-check-sso.html',
  // });
  //
  // const keycloakReady = true;
  // return {
  //   provide: {
  //     keycloak,
  //     keycloakReady,
  //   },
  // };
});
