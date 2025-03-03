<template>
  <q-input
    outlined
    :model-value="modelValue"
    :label="label"
    class="custom-input q-mb-md"
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
    default: 'Название',
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
