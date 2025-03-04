<template>
  <areal-pagination v-model="current" />
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
const current = ref(1);
const countColumn = ref(adminStore.countColumn.toString());

watch(countColumn, (newValue) => {
  adminStore.setCountColumn(newValue);
});
const options = ['10', '20', '30', '40', '50'];
</script>

<style scoped>
.pagination__select {
  width: 8%;
}
</style>
