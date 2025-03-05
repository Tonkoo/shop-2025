<template>
  <q-select
    :model-value="modelValue"
    :label="label"
    :options="option"
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
    type: Object,
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
    default: () => [],
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
.select {
  background: getColor('white', 1);
}
</style>
