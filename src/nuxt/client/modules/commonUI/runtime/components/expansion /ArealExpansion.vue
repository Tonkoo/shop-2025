<template>
  <q-expansion-item expand-icon-toggle :expand-icon="icon" :label="label">
    <slot />
  </q-expansion-item>
</template>

<script setup lang="ts">
defineProps({
  icon: {
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
