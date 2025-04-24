<template>
  <div class="about-block">
    <ArealBreadcrumbs />
    <div class="about-block__content">
      <div class="about-block__content__title">
        <span class="about-block__content__title__text">{{
          product.name
        }}</span>
        <span class="about-block__content__title__text"
          >{{ product.price }} ₽</span
        >
      </div>
      <div class="about-block__content__color">
        <span class="about-block__content__color__text">Цвет</span>
        <div
          class="about-block__content__color__circle"
          :style="{
            backgroundColor: product.hexColor,
            border:
              product.hexColor.toLowerCase() === '#ffffff'
                ? '1px solid black'
                : 'none',
          }"
        />
      </div>
      <div class="about-block__content__separation" />
      <div class="about-block__content__links">
        <span class="about-block__content__links__item">Описание</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductMain } from '~/interfaces/global';

defineProps({
  product: {
    type: Object as PropType<ProductMain>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.about-block {
  display: flex;
  flex-direction: column;
  width: calc(1 / 3) * 100%;
  padding: 0 40px;
  gap: 110px;
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
    &__separation {
      background-color: getColor('grey', 15);
      height: 1px;
      width: 100%;
    }
    &__links {
      &__item {
        cursor: pointer;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        letter-spacing: 0;
        color: getColor('grey', 12);
        background: linear-gradient(currentColor, currentColor) no-repeat 0 100%;
        background-size: 0 1px;
        transition: background-size 0.3s;

        &:hover {
          background-size: 100% 1px;
          color: getColor('grey', 13);
        }
      }
    }
  }
}
</style>
