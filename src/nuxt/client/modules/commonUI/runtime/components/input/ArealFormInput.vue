<template>
  <q-input
    outlined
    :model-value="modelValue"
    :label="label"
    class="custom-input q-mb-md"
    error-message="Поле обязательно для заполнения"
    :error="errors"
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
  errors: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
