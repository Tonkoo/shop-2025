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
  font-size: 16px;
  text-decoration: none;
  font-weight: 400;
  line-height: 20px;
}
</style>
