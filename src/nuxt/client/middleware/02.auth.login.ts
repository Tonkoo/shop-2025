import { api } from '#shared/api/axios';
import { useAuthorizationModule } from '~/modules/authorization/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export default defineNuxtRouteMiddleware(async (to) => {
  const authorizationModule = useAuthorizationModule();
  const adminStore = useAdminStore();
  const router = useRouter();
  console.log(3213);
  await authorizationModule
    .introspect()
    .then(async (response) => {
      if (response.active) {
        await router.push('/admin');
        adminStore.setAdmin(response);
      }
    })
    .catch((err) => {
      throw err;
    });
  // const { $keycloak } = useNuxtApp();
  // console.log($keycloak.authenticated);
  // if (!$keycloak.authenticated) {
  // await $keycloak.login();
  // }
  // const token = useCookie('access_token');
  // if (token.value) {
  //   try {
  //     const response = await api.get(
  //       'http://localhost/realms/shop-admin/protocol/openid-connect/userinfo',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token.value}`,
  //         },
  //       }
  //     );
  //     if (response.data) {
  //       if (to.path === '/login') {
  //         return navigateTo('/admin');
  //       }
  //       return;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
});
