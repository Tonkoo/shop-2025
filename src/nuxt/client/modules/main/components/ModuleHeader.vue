<template>
  <q-toolbar class="q-pa-md header">
    <q-btn
      flat
      round
      dense
      :icon="mainStores.sidebar ? 'close' : 'menu'"
      @click="mainStores.setSidebar()"
    />
    <q-space />
    <q-toolbar-title class="title">StyleHub</q-toolbar-title>
    <q-space />
    <q-btn flat round dense icon="search" />
  </q-toolbar>
</template>

<script setup lang="ts">
import { useMainStores } from '~/modules/main/stores/mainStores';

const mainStores = useMainStores();
</script>

<style scoped lang="scss">
.header {
  .title {
    text-align: center;
  }
}
</style>
