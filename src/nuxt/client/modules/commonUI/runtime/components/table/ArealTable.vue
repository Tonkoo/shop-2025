<template>
  <q-table
    class="areal-table full-height"
    flat
    bordered
    :hide-pagination="true"
    :pagination="pagination"
    :rows="rows"
    :columns="columns"
    row-key="id"
  >
    <template #body-cell-actions="props">
      <q-td :props="props">
        <areal-button
          outline
          label="Изменить"
          class="button"
          @click="OpenDialog(props.row.id)"
        />

        <areal-button
          outline
          label="Удалить"
          @click="OpenDelDialog(props.row.id)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import { useAdminStore } from '~/modules/admin/stores/adminStore';

const adminStore = useAdminStore();

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

const OpenDialog = (id: number) => {
  adminStore.setIsEdit(true);
  adminStore.setSelectedId(id);
  adminStore.setTypeItem(adminStore.typeSearch.value, false);
  adminStore.setViewModal(true);
};

const OpenDelDialog = (id: number) => {
  adminStore.setSelectedIdDel(id);
  adminStore.setDelDialog(true);
};

const pagination = {
  rowsPerPage: 0,
};
</script>

<style lang="scss">
.areal-table {
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
  .button {
    margin-right: 7px;
  }
}
</style>
