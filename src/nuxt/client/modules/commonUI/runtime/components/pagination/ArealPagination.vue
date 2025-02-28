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

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArealPagination',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      default: 'Название',
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped></style>
