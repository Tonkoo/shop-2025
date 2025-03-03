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
  </q-toolbar>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';

const adminStore = useAdminStore();
</script>

<style scoped></style>
