<!--TODO: Сделать перемнную error computed. Внутри сделать проверку на errorMessage. Если есть ErrorMessage, то переменная error бдует true, а если нету, то false-->
<template>
  <q-input
    outlined
    :model-value="modelValue"
    :label="label"
    class="custom-input q-mb-md"
    :error="error"
    :error-message="errorsMessage"
    :name="name"
    @update:model-value="$emit('update:modelValue', $event)"
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
    default: 'Название',
  },
  errorsMessage: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
});

const error = computed(() => {
  return !!props.errorsMessage;
});
defineEmits(['update:modelValue']);
</script>

<style scoped></style>
