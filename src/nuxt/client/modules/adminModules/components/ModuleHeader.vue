<script lang="ts">
import { inject } from 'vue'

export default {
  setup() {
    const openDialog = inject('openDialog')
    return {
      openDialog,
    }
  },
}
</script>

<template>
  <q-toolbar class="q-pa-md">
    <q-toolbar-title>Администрирование</q-toolbar-title>
    <q-space />
    <q-btn outline label="Добавить" icon="add" @click="openDialog" />
  </q-toolbar>
</template>

<style scoped></style>
