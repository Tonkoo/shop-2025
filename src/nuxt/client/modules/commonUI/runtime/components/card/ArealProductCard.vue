<template>
  <div class="card">
    <div class="card__section">
      <div class="card__img-block">
        <areal-link :link="product.url">
          <areal-img :src="product.images[0].src" />
        </areal-link>
      </div>
      <div class="card__description">
        <div class="card__description-title">
          <areal-link class="card__description-link" :link="product.url">
            {{ product.name }}
          </areal-link>
          <div
            class="card__description-circle"
            :style="{ backgroundColor: product.hexColor }"
          />
        </div>
        <span class="card__description-price">{{ product.price }} ₽</span>
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
.card {
  width: 100%;
  height: 100%;
  &__section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__description {
    display: flex;
    flex-direction: column;
    gap: 6px;
    &-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &-link {
      color: getColor('grey', 12);
    }
    &-circle {
      width: 15px;
      height: 15px;
      border: 1px solid black;
      border-radius: 50%;
    }
    &-price {
      font-size: 14px;
      color: getColor('grey', 13);
    }
  }
}
</style>
