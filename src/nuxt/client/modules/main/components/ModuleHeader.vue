<template>
  <!--  TODO: Избавиться от q-toolbar. Использовать стили как на макете div-->
  <q-toolbar class="q-pa-md header">
    <!--    TODO: перенести в CommonUI-->
    <q-btn
      flat
      round
      dense
      :icon="mainStores.sidebar ? 'close' : 'menu'"
      @click="mainStores.setSidebar()"
    />
    <!--    TODO: Избавиться от q-space-->
    <q-space />
    <!--    TODO  Использоваться NuxtLink-->
    <!--  TODO: Избавиться от q-toolbar-title. Использовать стили как на макете span-->
    <q-toolbar-title class="title"><a href="/">StyleHub</a> </q-toolbar-title>
    <q-space />
    <!--    <q-btn flat round dense icon="search" />-->
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

    a {
      text-decoration: none;
      color: black;
    }
  }
}
</style>
