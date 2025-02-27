<script lang="ts">
import LayoutHeader from '~/layout/adminLayout/components/LayoutHeader.vue'
import LayoutSearch from '~/layout/adminLayout/components/LayoutSearch.vue'
import LayoutToggle from '~/layout/adminLayout/components/LayoutToggle.vue'
import LayoutTable from '~/layout/adminLayout/components/LayoutTable.vue'
import LayoutDialog from '~/layout/adminLayout/components/LayoutDialog.vue'
import { useDialog } from '~/modules/adminModules/composables/UseDialog'

export default {
  components: {
    LayoutDialog,
    LayoutTable,
    LayoutToggle,
    LayoutHeader,
    LayoutSearch,
  },
  setup() {
    const { dialog, openDialog, closeDialog } = useDialog()

    provide('dialog', dialog)
    provide('openDialog', openDialog)
    provide('closeDialog', closeDialog)

    return {}
  },
}
</script>

<template>
  <q-layout>
    <q-header class="bg-white text-black">
      <LayoutHeader />
    </q-header>
    <q-page-container style="padding-top: 100px">
      <main>
        <LayoutSearch />
        <layoutToggle />
        <LayoutTable />
        <LayoutDialog />
      </main>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
