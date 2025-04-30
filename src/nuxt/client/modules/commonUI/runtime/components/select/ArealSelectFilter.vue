<template>
  <q-select
    :model-value="modelValue"
    :label="label"
    outlined
    square
    :options="option"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import type { SectionAdmin } from '~/interfaces/adminGlobal';

defineProps({
  modelValue: {
    type: Object as PropType<SectionAdmin | null>,
    required: false,
    default: null,
  },
  label: {
    type: String,
    default: 'Изображения',
  },
  option: {
    type: Array,
    required: false,
    default: null,
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
