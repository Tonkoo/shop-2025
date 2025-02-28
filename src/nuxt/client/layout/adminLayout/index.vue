<template>
  <q-layout>
    <q-header class="bg-white text-black">
      <LayoutHeader />
    </q-header>
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
  </q-layout>
</template>

<script lang="ts">
import LayoutHeader from '~/layout/adminLayout/components/LayoutHeader.vue';
import LayoutSearch from '~/layout/adminLayout/components/LayoutSearch.vue';
import LayoutTable from '~/layout/adminLayout/components/LayoutTable.vue';
import LayoutPagination from '~/layout/adminLayout/components/LayoutPagination.vue';
import LayoutDialog from '~/layout/adminLayout/components/LayoutDialog.vue';
import { useDialog } from '~/modules/adminModules/composables/UseDialog';

export default {
  components: {
    LayoutDialog,
    LayoutTable,
    LayoutHeader,
    LayoutSearch,
    LayoutPagination,
  },
  setup() {
    const { dialog, openDialog, closeDialog } = useDialog();

    provide('dialog', dialog);
    provide('openDialog', openDialog);
    provide('closeDialog', closeDialog);

    return {};
  },
};
</script>

<style scoped lang="scss">
.main {
  .main__search-block {
    padding: 10px;
    margin: 0 20px;
    background: getColor('grey', 7);
  }
}
</style>
