<template>
  <q-select
    :model-value="modelValue"
    :label="label"
    :options="option"
    square
    outlined
    class="select"
    @update:model-value="$emit('update:modelValue', $event)"
    @filter="handleFilter"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No result </q-item-section>
      </q-item>
    </template>
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
const emit = defineEmits(['update:modelValue', 'filter']);
const handleFilter = (val: string, update: (callback: () => void) => void) => {
  emit('filter', val);
  update(() => {});
};
</script>

<style scoped lang="scss">
.select {
  background: getColor('white', 1);
}
</style>
