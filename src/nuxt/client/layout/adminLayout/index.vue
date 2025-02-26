<script setup lang="ts">
import LayoutHeader from '~/layout/adminLayout/components/LayoutHeader.vue'
import LayoutSearch from '~/layout/adminLayout/components/LayoutSearch.vue'
import LayoutToggle from '~/layout/adminLayout/components/LayoutToggle.vue'
import LayoutTable from '~/layout/adminLayout/components/LayoutTable.vue'
</script>

<template>
  <q-layout>
    <q-header class="bg-white text-black">
      <LayoutHeader />
    </q-header>
    <q-page-container style="padding-top: 100px">
      <main>
        <LayoutSearch />
        <layoutToggle />
        <LayoutTable />
      </main>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
