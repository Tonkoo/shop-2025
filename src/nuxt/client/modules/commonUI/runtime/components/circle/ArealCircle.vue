<template>
  <div
    class="circle"
    :class="{
      circle_white: whiteStyle(color),
    }"
    :style="{
      backgroundColor: color,
    }"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ color: string }>(), {});

const whiteStyle = (color: string) => color.toLowerCase() === '#ffffff';
</script>

<style scoped lang="scss">
.circle {
  border-radius: 50%;

  &_white {
    border: 1px solid black;
  }
}
</style>
