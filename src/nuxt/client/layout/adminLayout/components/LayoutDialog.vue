<template>
  <div class="q-pa-md q-gutter-sm dialog">
    <ArealDialog :model-value="dialog">
      <q-card class="dialog__card">
        <ModuleHeaderDialog />
        <ModuleFormSectionDialog v-if="typeItem == 'section'" />
        <ModuleDialogFormProduct v-if="typeItem == 'product'" />
        <ModuleFooterDialog />
      </q-card>
    </ArealDialog>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue'
import ArealDialog from '~/modules/commonUI/runtime/components/dialog/ArealDialog.vue'
import ModuleHeaderDialog from '~/modules/adminModules/components/ModuleHeaderDialog.vue'
import ModuleFooterDialog from '~/modules/adminModules/components/ModuleFooterDialog.vue'
import ModuleDialogFormSection from '~/modules/adminModules/components/ModuleDialogFormSection.vue'
import ModuleDialogFormProduct from '~/modules/adminModules/components/ModuleDialogFormProduct.vue'

export default {
  components: {
    ModuleDialogFormProduct,
    ModuleHeaderDialog,
    ArealDialog,
    ModuleFooterDialog,
    ModuleFormSectionDialog: ModuleDialogFormSection,
  },
  setup() {
    const dialog = inject<Ref<boolean>>('dialog', ref(false))
    const typeItem = useState('typeItem')
    return {
      dialog,
      typeItem,
    }
  },
}
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
