<template>
  <ModuleFormAuthorization
    :user="authorizationStore.user"
    :error="authorizationStore.error"
    @update:username="(value) => authorizationStore.setUsername(value)"
    @update:password="(value) => authorizationStore.setPassword(value)"
    @authorization="authorizationUser"
  />
</template>

<script setup lang="ts">
import ModuleFormAuthorization from '~/modules/authorization/components/ModuleFormAuthorization.vue';
import { useAuthorizationStore } from '~/modules/authorization/stores/authorizationStore';
import { useAuthorizationModule } from '~/modules/authorization/global';
import type { AuthorizationResponse } from '~/interfaces/resultGlobal';

const authorizationStore = useAuthorizationStore();
const authorizationModule = useAuthorizationModule();
// const { $keycloak } = useNuxtApp();

const router = useRouter();
const authorizationUser = async () => {
  await authorizationModule
    .authorizationUser()
    .then(async () => {
      authorizationStore.setError(false);
      authorizationStore.setUsername('');
      authorizationStore.setPassword('');
      await router.push('/admin');
    })
    .catch((err) => {
      authorizationStore.setError(true);
    });
};
</script>

<style scoped lang="scss"></style>
