<template>
  <q-img :src="src" :alt="alt" />
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss"></style>
