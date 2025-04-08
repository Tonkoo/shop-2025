<template>
  <NuxtLink :to="link">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  link: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss"></style>
