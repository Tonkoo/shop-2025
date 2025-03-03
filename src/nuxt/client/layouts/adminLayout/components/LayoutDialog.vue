<template>
  <div class="q-pa-md q-gutter-sm dialog">
    <ArealDialog :model-value="dialog">
      <q-card class="dialog__card">
        <ModuleHeaderDialog />
        <ModuleFormSectionDialog />
        <!--        <ModuleDialogFormProduct v-if="typeItem == 'product'" />-->
        <ModuleFooterDialog />
      </q-card>
    </ArealDialog>
  </div>
</template>

<script lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import ArealDialog from '~/modules/commonUI/runtime/components/dialog/ArealDialog.vue';
import ModuleHeaderDialog from '~/modules/admin/components/ModuleHeaderDialog.vue';
import ModuleFooterDialog from '~/modules/admin/components/ModuleFooterDialog.vue';
import ModuleDialogFormSection from '~/modules/admin/components/ModuleDialogFormSection.vue';
import ModuleDialogFormProduct from '~/modules/admin/components/ModuleDialogFormProduct.vue';

export default {
  components: {
    ModuleDialogFormProduct,
    ModuleHeaderDialog,
    ArealDialog,
    ModuleFooterDialog,
    ModuleFormSectionDialog: ModuleDialogFormSection,
  },

  setup() {
    const adminStore = useAdminStore();

    const dialog = computed(() => adminStore.viewModal);

    console.log(dialog);
    return {
      dialog,
    };
  },
};
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
