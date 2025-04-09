<template>
  <q-btn :label="label" class="button" :disable="disable">
    <slot />
  </q-btn>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
  disable: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
.button {
  color: getColor('black', 1);
  background: getColor('white', 1);
}
</style>
