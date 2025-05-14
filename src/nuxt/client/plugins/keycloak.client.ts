import Keycloak from 'keycloak-js';

export default defineNuxtPlugin(async (nuxtApp) => {
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
