<template>
  <ModuleFormAuthorization
    :user="authorizationStore.user"
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
    .then(async (response: AuthorizationResponse) => {
      console.log(21312);
      // await $keycloak.init({
      //   token: response.access_token,
      //   refreshToken: response.refresh_token,
      //   onLoad: 'check-sso',
      // });
      // sessionStorage.setItem('keycloak-token', response.access_token);
      setInterval(() => {}, 1000);
      await router.push('/admin');
    });
};
</script>

<style scoped lang="scss"></style>
