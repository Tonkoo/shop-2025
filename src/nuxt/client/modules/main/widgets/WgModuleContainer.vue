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
  <q-footer class="footer">
    <ModuleFooter />
  </q-footer>
</template>

<script setup lang="ts">
import ModuleHeader from '~/modules/main/components/ModuleHeader.vue';
import ModuleFooter from '~/modules/main/components/ModuleFooter.vue';
</script>

<style scoped lang="scss">
.footer {
  background: getColor('grey', 12);
}
</style>
