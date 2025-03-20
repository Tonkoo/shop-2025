<template>
  <areal-pagination
    v-model="adminStore.currentPage"
    :max="totalPages"
    @update:model-value="adminStore.setCurrentPage"
  />
  <q-space />
  <areal-select
    v-model="countColumn"
    :option="options"
    class="pagination__select"
    :label="$t('admin.label.countColumn')"
    @update:model-value="adminStore.setCountColumn"
  />
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';

const adminStore = useAdminStore();
const countColumn = computed(() => adminStore.countColumn.toString());

const totalPages = computed(() => {
  const allCount = adminStore.allCount;
  const perPage = parseInt(countColumn.value, 10);
  return Math.ceil(allCount / perPage);
});

const options = ['10', '20', '30', '40', '50'];
</script>

<style scoped>
.pagination__select {
  width: 8%;
}
</style>
