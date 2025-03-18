<template>
  <p>Результатов: {{ rows.length }} из {{ adminStore.countColumn }}</p>
  <areal-table :rows="rows" :columns="columns" />
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useQuasar } from 'quasar';
import { useAdminModule } from '~/modules/admin/global';
import { notifyNegative } from '~/entities/notify.entites';

const quasar = useQuasar();

const adminStore = useAdminStore();
const adminModule = useAdminModule();

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
    name: 'createAt',
    required: true,
    label: 'Дата создания',
    align: 'left' as const,
    field: 'createAt',
    sortable: true,
  },
  {
    name: 'updateAt',
    required: true,
    label: 'Дата редактирования',
    align: 'left' as const,
    field: 'updateAt',
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

onMounted(async () => {
  await adminModule.getItems().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});

const rows = computed(() => {
  return adminStore.items;
});
</script>

<style lang="scss" scoped>
p {
  color: getColor('grey', 10);
}
</style>
