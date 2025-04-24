<template>
  <div class="detail-container">
    <ProductGallery
      :product="detailPageStore.product"
      class="detail-container__gallery"
    />
    <div class="detail-container__information-block">
      <ArealBreadcrumbs />
      <div class="detail-container__content">
        <div class="detail-container__content__title">
          <span class="detail-container__content__title__text">{{
            detailPageStore.product.name
          }}</span>
          <span class="detail-container__content__title__text"
            >{{ detailPageStore.product.price }} ₽</span
          >
        </div>
        <div class="detail-container__content__color">
          <span class="detail-container__content__color__text">Цвет</span>
          <div
            class="detail-container__content__color__circle"
            :style="{
              backgroundColor: detailPageStore.product.hexColor,
              border:
                detailPageStore.product.hexColor.toLowerCase() === '#ffffff'
                  ? '1px solid black'
                  : 'none',
            }"
          />
        </div>
        <div class=""></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductGallery from '~/modules/catalog/components/detailPage/ProductGallery.vue';
import { useDetailPageStore } from '~/modules/catalog/stores/detailPageStore';

const detailPageStore = useDetailPageStore();
</script>

<style scoped lang="scss">
.detail-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  &__gallery {
    flex: 1;
  }
  &__information-block {
    display: flex;
    flex-direction: column;
    width: calc(1 / 3) * 100%;
    padding: 0 40px;
    gap: 110px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    &__title {
      display: flex;
      flex-direction: column;
      gap: 12px;
      &__text {
        font-size: 22px;
        font-weight: 400;
        line-height: 26px;
        color: getColor('black', 1);
      }
    }
    &__color {
      display: flex;
      flex-direction: column;
      gap: 6px;
      &__text {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0;
        color: getColor('grey', 13);
      }
      &__circle {
        width: 26px;
        height: 26px;
        //border: 1px solid black;
        border-radius: 50%;
      }
    }
  }
}
</style>
