<template>
  <q-header class="bg-white text-black">
    <ModuleHeader />
  </q-header>
  <q-page-container>
    <main class="main">
      <!--      <div class="main__search-block">-->
      <!--        <module-search />-->
      <!--      </div>-->
      <!--      <div class="q-pa-md">-->
      <!--        <ModuleTable />-->
      <!--      </div>-->
      <!--      <q-toolbar>-->
      <!--        <ModulePagination />-->
      <!--      </q-toolbar>-->
      <!--      <Dialog />-->
      <!--      <DialogDelete />-->
    </main>
  </q-page-container>
</template>

<script setup lang="ts">
import ModuleHeader from '~/modules/main/components/ModuleHeader.vue';
</script>

<style scoped></style>
