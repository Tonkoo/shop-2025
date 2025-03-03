<template>
  <q-btn-toggle
    :model-value="modelValue"
    toggle-color="black"
    spread
    no-caps
    color="white"
    text-color="black"
    :options="options"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: string;
}

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array as () => Option[],
    required: true,
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
