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
    outlined
    class="select"
    @update:model-value="$emit('update:modelValue', $event)"
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
  model: {
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

defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
.select {
  background: getColor('white', 1);
}
</style>
