<template>
  <NuxtLink :to="link" class="link">
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

<style scoped lang="scss">
.link {
  text-decoration: none;
}
</style>
