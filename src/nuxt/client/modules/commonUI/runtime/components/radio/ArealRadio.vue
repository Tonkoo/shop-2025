<template>
  <q-radio :model-value="modelValue" :val="val" :label="label" />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: false,
    default: null,
  },
  val: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss"></style>
