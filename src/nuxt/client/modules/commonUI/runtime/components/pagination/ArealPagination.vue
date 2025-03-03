<template>
  <q-pagination
    :model-value="modelValue"
    color="black"
    :max="10"
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
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
