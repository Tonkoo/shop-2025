<script lang="ts">
import { defineComponent } from 'vue'

interface Option {
  label: string
  value: string
}

export default defineComponent({
  name: 'CustomInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array as () => Option[],
      required: true,
    },
  },
  emits: ['update:modelValue'],
})
</script>

<template>
  <q-btn-toggle
    :model-value="modelValue"
    toggle-color="black"
    spread
    no-caps
    color="white"
    text-color="black"
    :options="options"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<style scoped></style>
