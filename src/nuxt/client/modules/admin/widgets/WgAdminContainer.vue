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
    </main>
  </q-page-container>
</template>

<script setup lang="ts">
import Dialog from '~/modules/admin/components/dialog/Dialog.vue';
import ModuleHeader from '~/modules/admin/components/ModuleHeader.vue';
import ModuleSearch from '~/modules/admin/components/table/ModuleSearch.vue';
import ModulePagination from '~/modules/admin/components/table/ModulePagination.vue';
import ModuleTable from '~/modules/admin/components/table/ModuleTable.vue';
</script>

<style scoped></style>
