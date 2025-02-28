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

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArealSelectSearch',
  props: {
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
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped lang="scss">
.select {
  background: getColor('white', 1);
}
</style>
