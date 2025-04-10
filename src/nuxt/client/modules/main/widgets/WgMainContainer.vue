<template>
  <div class="swiper">
    <span class="swiper__title">Новинки</span>
    <Swiper />
  </div>

  <div class="title-main">Подарки</div>
  <ProductList />
</template>

<script setup lang="ts">
import Swiper from '~/modules/main/components/Swiper.vue';
import ProductList from '~/modules/main/components/ProductList.vue';
</script>

<style scoped lang="scss">
.swiper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  padding: 0 16px;
  width: 100%;
  &__title {
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    text-transform: uppercase;
    color: getColor('black', 1);
  }
}
</style>
