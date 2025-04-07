<template>
  <q-file
    :model-value="modelValue"
    filled
    multiple
    use-chips
    append
    :label="label"
    class="q-mb-md"
    accept=".jpg, image/*"
    max-files="6"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Array as PropType<File[]>,
    required: false,
    default: null,
  },
  label: {
    type: String,
    default: 'Изображения',
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
