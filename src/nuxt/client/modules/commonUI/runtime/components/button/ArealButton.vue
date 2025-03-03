<template>
  <q-btn :label="label" class="button" />
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'Название',
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
