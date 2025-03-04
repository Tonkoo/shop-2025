<template>
  <q-pagination
    :model-value="modelValue"
    color="black"
    :max="max"
    :max-pages="6"
    boundary-numbers
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    default: 'Название',
  },
  max: {
    type: Number,
    default: 10,
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
