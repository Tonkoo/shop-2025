<template>
  <q-checkbox
    :model-value="modelValue"
    color="black"
    :label="label"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArealInput',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      default: 'Выводить на главную страницу',
    },
  },
  emits: ['update:modelValue'],
})
</script>

<style scoped></style>
