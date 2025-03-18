<template>
  <q-card-section class="row items-center no-wrap">
    <q-toolbar>
      <q-toolbar-title>{{
        adminStore.isEdit ? 'Редактирование' : 'Новая запись'
      }}</q-toolbar-title>
      <q-space />
      <q-btn flat round icon="close" @click="adminStore.setViewModal(false)" />
    </q-toolbar>
  </q-card-section>
  <areal-btn-toggle
    v-model="typeItem"
    :options="options"
    class="q-mb-md"
    @update:model-value="adminStore.setTypeItem"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

const adminStore = useAdminStore();
const { typeItem } = storeToRefs(adminStore);

const options = [
  { label: 'Раздел', value: 'section' },
  { label: 'Продукт', value: 'product' },
];
</script>

<style scoped></style>
