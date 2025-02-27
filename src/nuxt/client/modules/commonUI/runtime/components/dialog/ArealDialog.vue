<template>
  <q-dialog
    :model-value="modelValue"
    position="right"
    full-height
    class="dialog"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArealDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
})
</script>

<style scoped></style>
