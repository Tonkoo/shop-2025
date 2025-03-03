<template>
  <q-select
    :model-value="modelValue"
    :label="label"
    square
    outlined
    class="select"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </q-select>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: false,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  option: {
    type: Array,
    required: false,
    default: null,
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
.select {
  background: getColor('white', 1);
}
</style>
