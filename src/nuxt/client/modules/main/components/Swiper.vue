<template>
  <areal-swiper :data-items="mainStores.mainSlider">
    <template #default="{ item }">
      <ArealProductCard :product="item as ProductMain" />
    </template>
  </areal-swiper>
</template>

<script setup lang="ts">
import { useMainStores } from '~/modules/main/stores/mainStores';
import type { ProductMain } from '~/interfaces/global';

const mainStores = useMainStores();
</script>

<style scoped lang="scss"></style>
