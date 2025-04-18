<template>
  <q-input
    square
    outlined
    :debounce="debounce"
    :model-value="modelValue"
    :label="label"
    @keydown="handleKeyDown"
    @update:model-value="handleInput"
  />
</template>

<script setup lang="ts">
const props = defineProps({
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
  debounce: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleKeyDown = (e: KeyboardEvent) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  if (!allowedKeys.includes(e.key) && isNaN(Number(e.key))) {
    e.preventDefault();
  }
};

const handleInput = (value: string | null | number) => {
  if (value === '') {
    emit('update:modelValue', '');
    return;
  }

  const numValue = Number(value);
  if (props.max > 0 && numValue > props.max) {
    emit('update:modelValue', String(props.max));
  } else {
    emit('update:modelValue', value);
  }
};
</script>

<style scoped></style>
