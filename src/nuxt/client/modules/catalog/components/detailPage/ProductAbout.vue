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
        <span class="about-block__content__color__text">{{
          $t('catalog.label.color')
        }}</span>
        <ArealCircle
          :color="product.hexColor"
          class="about-block__content__color__circle"
        />
      </div>
      <div class="about-block__content__separation" />
      <div class="about-block__content__links">
        <span
          class="about-block__content__links__item"
          @click="emit('open-dialog')"
          >{{ $t('catalog.label.description') }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductMain } from '~/interfaces/mainGlobal';

defineProps({
  product: {
    type: Object as PropType<ProductMain>,
    required: true,
  },
});

const emit = defineEmits(['open-dialog']);
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
        @include font-preset('Text/22pxMedium');
        color: getColor('black', 1);
      }
    }
    &__color {
      display: flex;
      flex-direction: column;
      gap: 6px;
      &__text {
        @include font-preset('Text/14px');
        letter-spacing: 0;
        color: getColor('grey', 13);
      }
      &__circle {
        width: 26px;
        height: 26px;
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
        @include font-preset('Text/14px');
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
