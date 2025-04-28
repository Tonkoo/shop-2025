<template>
  <div class="tag">
    <slot />
    <ArealSvg size="S" icon-name="CloseIcon" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.tag {
  display: inline-flex;
  align-items: center;
  color: getColor('white', 1);
  @include font-preset('Text/12pxRegular');
  padding: 5px;
  background-color: getColor('black', 1);
  column-gap: 4px;
}
</style>
