<template>
  <div class="main-slider">
    <div class="slider">
      <span class="slider__title">Новинки</span>
      <Swiper />
    </div>
  </div>
  <div class="main-list">
    <div class="product-list">
      <span class="product-list__title">Подарки</span>
      <ProductList />
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from '~/modules/main/components/Swiper.vue';
import ProductList from '~/modules/main/components/ProductList.vue';
</script>

<style scoped lang="scss">
.main-slider {
  padding: 0 40px;
}
.slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  gap: 24px;
  width: 100%;
  &__title {
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    text-transform: uppercase;
    color: getColor('black', 1);
  }
}
.main-list {
  padding: 0 40px;
}
.product-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  &__title {
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    text-transform: uppercase;
    color: getColor('black', 1);
  }
}
</style>
