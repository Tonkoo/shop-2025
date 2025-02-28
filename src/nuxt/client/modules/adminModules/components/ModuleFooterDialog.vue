<template>
  <q-card-actions
    align="left"
    class="dialog__card__footer"
  >
    <q-btn
      color="black"
      label="Добавить"
    />
    <q-btn
      outline
      label="Отмена"
      @click="closeDialog"
    />
  </q-card-actions>
</template>

<script lang="ts">
import { inject } from 'vue'

export default {
  setup() {
    const closeDialog = inject<() => void>('closeDialog')
    return {
      closeDialog,
    }
  },
}
</script>

<style scoped lang="scss">
  .dialog__card__footer {
    border-top: 1px solid #ddd;
  }
</style>
