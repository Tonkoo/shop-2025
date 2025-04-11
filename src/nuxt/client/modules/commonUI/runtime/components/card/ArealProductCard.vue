<template>
  <div class="card">
    <div class="card__section">
      <div class="card__img-block">
        <areal-link :link="product.url">
          <areal-img :src="productImage" />
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
import type { ProductMain, SectionMain } from '~/interfaces/global';
import defaultSVG from '~/modules/commonUI/assets/icon/default.svg';

const props = defineProps({
  product: {
    type: Object as PropType<ProductMain | SectionMain>,
    required: true,
  },
});

const productImage = computed(() => {
  if (!props.product.images?.length || !props.product.images[0]?.src) {
    return defaultSVG;
  }
  return props.product.images[0].src;
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
