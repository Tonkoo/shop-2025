<template>
  <q-select
    :model-value="modelValue"
    :label="label"
    outlined
    :options="option"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: false,
    default: null,
  },
  label: {
    type: String,
    default: '',
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
