<template>
  <q-toolbar class="q-pa-md">
    <q-toolbar-title>Администрирование</q-toolbar-title>
    <q-space />
    <areal-button
      outline
      label="Добавить"
      icon="add"
      @click="adminStore.setViewModal(true)"
    />
    <areal-button
      outline
      label="Переиндексировать"
      icon="database"
      @click="reindexDoc"
    />
  </q-toolbar>
</template>

<script setup lang="ts">
import { useAdminModule } from '~/modules/admin/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useQuasar } from 'quasar';
import { notifyNegative, notifyPositive } from '~/entities/notify.entites';

const adminStore = useAdminStore();
const adminModule = useAdminModule();
const quasar = useQuasar();

const reindexDoc = () => {
  adminModule
    .reindex()
    .then(() => {
      quasar.notify(notifyPositive);
    })
    .catch((err) => {
      quasar.notify({
        ...notifyNegative,
        message: 'Ошибка при сохранении данных: ' + err,
      });
    });
};
</script>

<style scoped>
.button {
  margin-right: 7px;
}
</style>
