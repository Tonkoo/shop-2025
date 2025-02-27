<template>
  <div class="q-pa-md q-gutter-sm dialog">
    <!--    <ModuleDialog />-->
    <ArealDialog :model-value="dialog">
      <q-card class="dialog__card">
        <ModuleHeaderDialog />
        <ModuleFormSectionDialog />
        <ModuleFooterDialog />
      </q-card>
    </ArealDialog>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue'
import ModuleDialog from '~/modules/adminModules/components/ModuleDialog.vue'
import ArealDialog from '~/modules/commonUI/runtime/components/dialog/ArealDialog.vue'
import ModuleHeaderDialog from '~/modules/adminModules/components/ModuleHeaderDialog.vue'
import ModuleFooterDialog from '~/modules/adminModules/components/ModuleFooterDialog.vue'
import ModuleFormSectionDialog from '~/modules/adminModules/components/ModuleFormSectionDialog.vue'

export default {
  components: {
    ModuleDialog,
    ModuleHeaderDialog,
    ArealDialog,
    ModuleFooterDialog,
    ModuleFormSectionDialog,
  },
  setup() {
    const dialog = inject<Ref<boolean>>('dialog', ref(false))
    return {
      dialog,
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
