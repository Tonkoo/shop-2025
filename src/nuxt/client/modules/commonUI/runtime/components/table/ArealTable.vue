<template>
  <q-table
    class="my-sticky-header-table full-height"
    flat
    bordered
    :hide-pagination="true"
    :pagination="pagination"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :rows-per-page-options="rowsPerPageOptions"
  >
    <template #body-cell-actions="props">
      <q-td :props="props">
        <areal-button outline label="Изменить" />

        <areal-button outline label="Удалить" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';

defineProps({
  rows: {
    type: Array,
    required: false,
    default: null,
  },
  columns: {
    type: Array as () => QTableColumn[],
    required: false,
    default: () => [] as QTableColumn[],
  },
});

const pagination = {
  rowsPerPage: 10,
};
const rowsPerPageOptions = [10, 20, 30, 40, 50, 0];
</script>

<style lang="scss">
.my-sticky-header-table {
  .q-table__top,
  thead tr:first-child th {
    background-color: getColor('grey', 6);
    border-right: 1px getColor('grey', 1) solid;
  }
  thead tr th:last-child {
    border-right: none;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }
}
</style>
