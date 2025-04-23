<template>
  <div class="main-slider">
    <div class="slider">
      <span class="slider__title">Новинки</span>
      <Swiper :main-slider="mainSlider" />
      <ArealLink class="slider__link" link="catalog/novinki/"
        >Смотреть все</ArealLink
      >
    </div>
  </div>
  <div class="main-list">
    <div class="product-list">
      <span class="product-list__title">Подарки</span>
      <ProductList :main-gifts="mainGifts" />
      <ArealLink class="product-list__link" link="catalog/podarki/"
        >Смотреть все</ArealLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from '~/modules/main/components/Swiper.vue';
import ProductList from '~/modules/main/components/ProductList.vue';
import { useMainStores } from '~/modules/main/stores/mainStores';

const mainStores = useMainStores();

const { mainSlider, mainGifts } = mainStores;
</script>

<style scoped lang="scss">
.main-slider {
  padding: 0 40px;
}
.slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 24px;
  width: 100%;
  &__title {
    font-size: 22px;
    font-weight: 500;
    text-transform: uppercase;
    color: getColor('black', 1);
  }
  &__link {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    border-bottom: 1px solid getColor('black', 1);
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
  align-items: center;
  gap: 24px;
  &__title {
    font-size: 22px;
    font-weight: 500;
    text-transform: uppercase;
    color: getColor('black', 1);
  }
  &__link {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    border-bottom: 1px solid getColor('black', 1);
    color: getColor('black', 1);
  }
}
</style>
