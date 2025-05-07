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

const authorizationStore = useAuthorizationStore();
const authorizationModule = useAuthorizationModule();

const router = useRouter();
const authorizationUser = async () => {
  await authorizationModule.authorizationUser().then(async () => {
    await router.push('/admin');
  });
};
</script>

<style scoped lang="scss"></style>
