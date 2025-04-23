<template>
  <q-select
    :model-value="modelValue"
    :label="label"
    outlined
    class="q-mb-md"
    :error="error"
    :error-message="errorsMessage"
    :options="option"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import type { SelectColor } from '~/interfaces/global';

const props = defineProps({
  modelValue: {
    type: Object as PropType<SelectColor | null>,
    required: false,
    default: null,
  },
  label: {
    type: String,
    default: 'Цвет',
  },
  errorsMessage: {
    type: String,
    default: '',
  },
  option: {
    type: Array,
    required: false,
    default: null,
  },
});

const error = computed(() => {
  return !!props.errorsMessage;
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
