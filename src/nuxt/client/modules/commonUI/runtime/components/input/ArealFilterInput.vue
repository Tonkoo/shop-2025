<template>
  <q-input
    square
    outlined
    :debounce="debounce"
    :model-value="modelValue"
    :placeholder="placeholder"
    @keydown="handleKeyDown"
    @update:model-value="handleInput"
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
  const currentValue = props.modelValue;
  const maxValue = props.max.toString();

  if (currentValue === maxValue && !allowedKeys.includes(e.key)) {
    e.preventDefault();
    return;
  }

  if (props.max > 0 && !allowedKeys.includes(e.key) && !isNaN(Number(e.key))) {
    const potentialValue = currentValue + e.key;
    if (Number(potentialValue) > props.max) {
      e.preventDefault();
      return;
    }
  }

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
