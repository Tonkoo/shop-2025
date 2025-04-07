<template>
  <q-select
    :model-value="modelValue"
    :label="label"
    outlined
    class="q-mb-md"
    :options="option"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import type { Colors } from '~/interfaces/global';

defineProps({
  modelValue: {
    type: Object as PropType<Colors | null>,
    required: false,
    default: null,
  },
  label: {
    type: String,
    default: 'Цвет',
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
