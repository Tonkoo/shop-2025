<template>
  <q-page-container>
    <main class="main">
      <div class="main__search-block">
        <LayoutSearch />
      </div>
      <LayoutTable />
      <LayoutPagination />
      <LayoutDialog />
    </main>
  </q-page-container>
</template>

<script lang="ts">
import LayoutSearch from '~/layouts/adminLayout/components/LayoutSearch.vue';
import LayoutTable from '~/layouts/adminLayout/components/LayoutTable.vue';
import LayoutPagination from '~/layouts/adminLayout/components/LayoutPagination.vue';
import LayoutDialog from '~/layouts/adminLayout/components/LayoutDialog.vue';

export default {
  components: {
    LayoutSearch,
    LayoutTable,
    LayoutPagination,
    LayoutDialog,
  },
};
</script>

<style scoped></style>
