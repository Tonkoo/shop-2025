<template>
  <q-toolbar class="q-pa-md">
    <q-toolbar-title>Администрирование</q-toolbar-title>
    <q-space />
    <areal-button outline label="Добавить" icon="add" @click="openDialog" />
  </q-toolbar>
</template>

<script lang="ts">
import { inject } from 'vue';

export default {
  setup() {
    const openDialog = inject<Ref<() => void>>('openDialog');
    return {
      openDialog,
    };
  },
};
</script>

<style scoped></style>
