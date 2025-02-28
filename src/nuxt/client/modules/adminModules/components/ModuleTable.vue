<template>
  <p style="color: #818181">Результатов: 10</p>
  <areal-table :rows="rows" :columns="columns" />
</template>

<script lang="ts">
import { getSection } from '~/modules/adminModules/composables/ApiSection';

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
let rows = [
  {
    name: 'Frozen Yogurt',
    code: 159,
    createAt: 6.0,
    updateAt: 24,
  },
];
export default {
  setup() {
    return {
      rows,
      columns,
    };
  },
  mounted() {
    this.fetchSection();
  },
  methods: {
    async fetchSection() {
      rows = await getSection();
      console.log(rows.data);
    },
  },
};
</script>

<style lang="scss"></style>
