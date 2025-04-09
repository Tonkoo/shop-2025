<template>
  <areal-swiper :data-items="mainStores.mainSlider">
    <template #default="{ item }">
      <ArealProductCard :product="item" />
    </template>
  </areal-swiper>
</template>

<script setup lang="ts">
import { useMainStores } from '~/modules/main/stores/mainStores';

const mainStores = useMainStores();
</script>

<style scoped lang="scss"></style>
