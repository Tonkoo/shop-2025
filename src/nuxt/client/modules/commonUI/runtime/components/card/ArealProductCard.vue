<template>
  <q-card class="slide__card">
    <q-card-section class="card__section">
      <a :href="'/' + product.code + '/'">
        <q-img
          class="card__img"
          :src="`http://localhost/api/v1/${product.images[0].src}`"
        />
      </a>
      <div class="card__text">
        <div class="text-h6">
          <a :href="'/' + product.code + '/'">{{ product.name }}</a>
        </div>
        <div class="text-subtitle2">{{ product.price }} ₽</div>
        <div
          class="section__circle"
          :style="{ backgroundColor: product.color }"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { ProductMain, SectionMain } from '~/interfaces/global';

defineProps({
  product: {
    type: Object as PropType<ProductMain | SectionMain>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.slide__card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: none !important;
  border: none !important;

  .card__section {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: stretch;
    padding: 0;

    a {
      text-decoration: none;
      color: getColor('black', 2);
    }

    .card__img {
      width: 100%;
      object-fit: contain;
      margin-bottom: 12px;
      flex-shrink: 0;
    }

    .card__text {
      position: relative;
      flex-grow: 1;
      padding-right: 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .section__circle {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 15px;
      height: 15px;
      border: 1px solid black;
      border-radius: 50%;
    }
  }
}
</style>
