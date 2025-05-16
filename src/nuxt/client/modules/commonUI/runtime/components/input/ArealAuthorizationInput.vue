<template>
  <q-input
    square
    outlined
    :model-value="modelValue"
    :placeholder="placeholder"
    :type="type"
    :autocomplete="autocomplete"
    @update:model-value="(value) => emit('update:modelValue', value)"
  />
  <!--    :label="label"-->
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String as () => 'text' | 'password',
    default: 'text',
  },
  autocomplete: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped></style>
