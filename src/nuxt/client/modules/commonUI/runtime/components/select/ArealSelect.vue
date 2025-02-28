<template>
  <q-select
    :model-value="modelValue"
    :label="label"
    outlined
    class="q-mb-md"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArealSelect',
  props: {
    modelValue: {
      type: Object,
      required: false,
    },
    label: {
      type: String,
      default: 'Изображения',
    },
  },
  emits: ['update:modelValue'],
})
</script>

<style scoped></style>
