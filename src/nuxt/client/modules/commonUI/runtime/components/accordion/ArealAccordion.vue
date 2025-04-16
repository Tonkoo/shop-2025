<template>
  <div class="accordion">
    <div class="accordion__text">
      <span>{{ label }}</span>
      <ArealSvg icon-name="accordionOpen" />
    </div>

    <slot />
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
.accordion {
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  padding-bottom: 16px;
  cursor: pointer;
  &__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: getColor('grey', 12);
  }
}
</style>
