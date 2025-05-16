<template>
  <q-header class="bg-white text-black">
    <ModuleHeader />
  </q-header>
  <q-page-container>
    <main class="main">
      <div class="main__search-block">
        <module-search />
      </div>
      <div class="q-pa-md">
        <ModuleTable />
      </div>
      <q-toolbar>
        <ModulePagination />
      </q-toolbar>
      <Dialog />
      <DialogDelete />
    </main>
  </q-page-container>
</template>

<script setup lang="ts">
import Dialog from '~/modules/admin/components/dialog/Dialog.vue';
import DialogDelete from '~/modules/admin/components/dialog/DialogDelete.vue';
import ModuleHeader from '~/modules/admin/components/ModuleHeader.vue';
import ModuleSearch from '~/modules/admin/components/table/ModuleSearch.vue';
import ModulePagination from '~/modules/admin/components/table/ModulePagination.vue';
import ModuleTable from '~/modules/admin/components/table/ModuleTable.vue';
const accessToken = sessionStorage.getItem('access_token');
const isExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload.exp, 'payload');
    const now = Math.floor(Date.now() / 1000);
    console.log(now, 'now');
    return payload.exp < now;
  } catch {
    return true;
  }
};
if (accessToken) {
  isExpired(accessToken);
}

// const { $keycloak, $keycloakReady } = useNuxtApp();

// onMounted(() => {
//   if ($keycloakReady) {
//     console.log('Token:', $keycloak.token);
//     console.log('Authenticated:', $keycloak.authenticated);
//   }
// });
</script>

<style scoped></style>
