<template>
  <div class="q-pa-md q-gutter-sm dialog">
    <ArealDialog :model-value="dialog" :position="'right'" class="dialog">
      <q-card class="dialog__card">
        <ModuleHeaderDialog />
        <ModuleDialogFormSection v-if="typeItem == 'section'" />
        <ModuleDialogFormProduct v-if="typeItem == 'product'" />
        <ModuleFooterDialog />
      </q-card>
    </ArealDialog>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import ModuleHeaderDialog from '~/modules/admin/components/dialog/ModuleHeaderDialog.vue';
import ModuleFooterDialog from '~/modules/admin/components/dialog/ModuleFooterDialog.vue';
import ModuleDialogFormSection from '~/modules/admin/components/dialog/ModuleDialogFormSection.vue';
import ModuleDialogFormProduct from '~/modules/admin/components/dialog/ModuleDialogFormProduct.vue';

const adminStore = useAdminStore();
const dialog = computed(() => adminStore.viewModal);
const typeItem = computed(() => adminStore.typeItem);
</script>

<style scoped lang="scss">
.dialog {
  .dialog__card {
    width: 600px;
    display: flex;
    flex-direction: column;
  }
}
</style>
