<template>
  <q-dialog
    :model-value="modelValue"
    :position="position"
    full-height
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :transition-duration="300"
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
  transitionShow: {
    type: String,
    default: '',
  },
  transitionHide: {
    type: String,
    default: '',
  },
  transitionDuration: {
    type: Number,
    default: 300,
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
