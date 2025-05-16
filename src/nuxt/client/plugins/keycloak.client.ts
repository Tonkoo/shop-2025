import Keycloak from 'keycloak-js';
import { useAuthorizationModule } from '~/modules/authorization/global';
import { refreshToken as refreshTokenFn } from '~/modules/authorization/api';
import { test } from '~/composables/customFetch';
import { api } from '#shared/api/axios';
import type { AuthorizationResponse } from '~/interfaces/resultGlobal';

export default defineNuxtPlugin(async (nuxtApp) => {
  setInterval(async () => {
    try {
      const response = await $fetch<AuthorizationResponse>(
        `http://localhost/api/v1/auth/refresh`,
        {
          method: 'POST',
        }
      );
      console.log('testtetstetet');
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, 250 * 1000);
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
