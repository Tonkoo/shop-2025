<template>
  <areal-swiper :data-items="mainSlider">
    <template #default="{ item }">
      <ArealProductCard :product="item as ProductMain" />
    </template>
  </areal-swiper>
</template>

<script setup lang="ts">
import type { ProductMain } from '~/interfaces/mainGlobal';

defineProps({
  mainSlider: {
    type: Array as PropType<ProductMain[]>,
    required: true,
  },
});
</script>

<style scoped lang="scss"></style>
