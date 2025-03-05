<template>
  <p>Результатов: {{ rows.length }} из {{ adminStore.countColumn }}</p>
  <areal-table :rows="rows" :columns="columns" />
</template>

<script setup lang="ts">
import type { Product, Section } from '~/interfaces/global';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

const adminStore = useAdminStore();

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Наименование',
    align: 'left' as const,
    field: 'name',
    sortable: true,
  },
  {
    name: 'code',
    required: true,
    label: 'Символьный код',
    align: 'left' as const,
    field: 'code',
    sortable: true,
  },
  {
    name: 'create_at',
    required: true,
    label: 'Дата создания',
    align: 'left' as const,
    field: 'create_at',
    sortable: true,
  },
  {
    name: 'update_at',
    required: true,
    label: 'Дата редактирования',
    align: 'left' as const,
    field: 'update_at',
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Действие',
    align: 'left' as const,
    field: 'actions',
    sortable: true,
  },
];

const rows = ref<Section[] | Product[]>([]);

onMounted(async () => {
  await adminStore.getItems();
});

watch(
  () => adminStore.items,
  (newItems) => {
    rows.value = newItems;
  }
);
</script>

<style lang="scss" scoped>
p {
  color: getColor('grey', 10);
}
</style>
