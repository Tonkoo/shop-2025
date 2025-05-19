import { useAuthorizationModule } from '~/modules/authorization/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export default defineNuxtRouteMiddleware(async (to) => {
  const authorizationModule = useAuthorizationModule();
  const adminStore = useAdminStore();
  const router = useRouter();
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
});
