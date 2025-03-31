<template>
  <q-select
    use-input
    hide-selected
    fill-input
    input-debounce="600"
    :model-value="model"
    :label="label"
    :options="option"
    :error-message="errorsMessage"
    :error="errors"
    square
    outlined
    class="select"
    @update:model-value="setModel"
  >
    <!--    @filter="handleFilter"-->
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No result </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
defineProps({
  value: {
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
    default: () => [],
  },
  errors: {
    type: Boolean,
    default: false,
  },
  errorsMessage: {
    type: String,
    default: '',
  },
});
const model = ref('');
const emit = defineEmits(['update:modelValue', 'filter']);
// const handleFilter = (val: string, update: (callback: () => void) => void) => {
//   emit('filter', val);
//   update(() => {});
// };

const setModel = (val: string) => {
  model.value = val;
  emit('update:modelValue', val);
};
</script>

<style scoped lang="scss">
.select {
  background: getColor('white', 1);
}
</style>
