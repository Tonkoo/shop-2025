<template>
  <areal-pagination
    v-model="current"
    :max="totalPages"
    @update:model-value="adminStore.setCurrentPage"
  />
  <q-space />
  <areal-select
    v-model="countColumn"
    :option="options"
    class="pagination__select"
    label="На странице"
    @update:model-value="adminStore.setCountColumn"
  />
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';

const adminStore = useAdminStore();
const current = ref(adminStore.currentPage);
const countColumn = ref(adminStore.countColumn.toString());

watch(countColumn, (newValue) => {
  adminStore.setCountColumn(newValue);
});

const totalPages = computed(() => {
  const allCount = adminStore.AllCount;
  const perPage = parseInt(countColumn.value);
  return Math.ceil(allCount / perPage);
});

const options = ['10', '20', '30', '40', '50'];
</script>

<style scoped>
.pagination__select {
  width: 8%;
}
</style>
