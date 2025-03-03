<template>
  <p style="color: #818181">Результатов: 10</p>
  <areal-table :rows="rows" :columns="columns" />
</template>

<script setup lang="ts">
import { useAdminModule } from '~/modules/admin/global';

interface TableRow {
  name: string;
  code: string | number;
  create_at: string | number;
  update_at: string | number;
}

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

const rows = ref<TableRow[]>([]);

const adminModule = useAdminModule();

const fetchSection = async () => {
  try {
    rows.value = await adminModule.getSection();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
};

onMounted(() => {
  fetchSection();
});

// export default {
//   setup() {
//     const rows = ref<TableRow[]>([]);
//     return {
//       rows,
//       columns,
//     };
//   },
//   mounted() {
//     this.fetchSection();
//   },
//   methods: {
//     async fetchSection() {
//       this.rows = await getSection();
//     },
//   },
// };
</script>

<style lang="scss"></style>
