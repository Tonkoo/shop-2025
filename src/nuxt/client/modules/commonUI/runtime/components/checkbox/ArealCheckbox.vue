<template>
  <q-checkbox
    :model-value="modelValue"
    color="black"
    :label="label"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    default: 'Выводить на главную страницу',
  },
});
defineEmits(['update:modelValue']);
</script>

<style scoped></style>
