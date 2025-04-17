<template>
  <q-input
    square
    outlined
    :model-value="modelValue"
    :label="label"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
