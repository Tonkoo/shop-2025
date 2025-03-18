<template>
  <div class="q-pa-md q-gutter-sm dialog">
    <ArealDialog :model-value="dialog">
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
import ArealDialog from '~/modules/commonUI/runtime/components/dialog/ArealDialog.vue';
import ModuleHeaderDialog from '~/modules/admin/components/ModuleHeaderDialog.vue';
import ModuleFooterDialog from '~/modules/admin/components/ModuleFooterDialog.vue';
import ModuleDialogFormSection from '~/modules/admin/components/ModuleDialogFormSection.vue';
import ModuleDialogFormProduct from '~/modules/admin/components/ModuleDialogFormProduct.vue';

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
