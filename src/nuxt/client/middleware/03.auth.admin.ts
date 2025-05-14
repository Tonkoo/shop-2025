import { useAuthorizationModule } from '~/modules/authorization/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

export default defineNuxtRouteMiddleware(async (to) => {
  const authorizationModule = useAuthorizationModule();
  const router = useRouter();
  const adminStore = useAdminStore();
  await authorizationModule.introspect().then(async (response) => {
    if (!response.active) {
      await router.push('/authorization');
    }
    adminStore.setAdmin(response);
  });
});
