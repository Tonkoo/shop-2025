<!--TODO наименования вынести в ленги-->
<template>
  <q-toolbar class="q-pa-md">
    <q-toolbar-title>{{ $t('admin.title.header') }}</q-toolbar-title>
    <q-space />
    <areal-button
      outline
      :label="$t('admin.label.reindex')"
      icon="database"
      @click="reindexDoc"
    />
    <areal-button
      outline
      :label="$t('admin.label.add')"
      icon="add"
      @click="adminStore.setViewModal(true)"
    />
    <areal-button flat round icon="logout" @click="logout()" />
  </q-toolbar>
</template>

<script setup lang="ts">
import { useAdminModule } from '~/modules/admin/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useQuasar } from 'quasar';
import { notifyNegative, notifyPositive } from '~/entities/notify.entites';
import type { AxiosError } from 'axios';

const adminStore = useAdminStore();
const adminModule = useAdminModule();
const quasar = useQuasar();
const router = useRouter();

const reindexDoc = () => {
  quasar.loading.show();
  adminModule
    .reindex()
    .then(() => {
      quasar.loading.hide();
      quasar.notify(notifyPositive);
    })
    .catch((err: AxiosError) => {
      quasar.loading.hide();
      quasar.notify({
        ...notifyNegative,
        message: 'Ошибка: ' + err.message,
      });
    });
};

const logout = () => {
  adminModule.logout().then(async () => {
    window.location.replace('/authorization');
  });
};
</script>

<style scoped>
.button {
  margin-right: 7px;
}
</style>
