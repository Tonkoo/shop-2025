<template>
  <q-input
    outlined
    :model-value="modelValue"
    :label="label"
    class="custom-input q-mb-md"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArealInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Название',
    },
  },
  emits: ['update:modelValue'],
})
</script>

<style scoped></style>
