<template>
  <q-file
    :model-value="modelValue"
    filled
    multiple
    use-chips
    append
    :label="label"
    class="q-mb-md"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArealFile',
  props: {
    modelValue: {
      type: File as PropType<File | null | undefined>,
      required: false,
      default: null,
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
