<template>
  <q-dialog
    :model-value="modelValue"
    :position="position"
    full-height
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </q-dialog>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  position: {
    type: String as PropType<'right' | 'standard' | 'top' | 'bottom' | 'left'>,
    default: 'right',
  },
  transition: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
