<template>
  <q-dialog
    :model-value="modelValue"
    position="right"
    full-height
    class="dialog"
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
});

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
