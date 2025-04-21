<template>
  <div class="tag">
    <slot />
    <!--    <span>от {{ catalogStore.filterCatalog.priceFrom }}</span>-->
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
  padding: 5px;
  background-color: getColor('black', 1);
  color: getColor('white', 1);
  font-size: 12px;
  column-gap: 4px;
}
</style>
