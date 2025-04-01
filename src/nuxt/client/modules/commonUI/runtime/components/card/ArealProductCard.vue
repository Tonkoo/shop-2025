<template>
  <q-card class="slide__card">
    <q-card-section class="card__section">
      <div class="img__container">
        <a :href="'/' + product.code + '/'">
          <q-img
            class="card__img"
            :src="`http://localhost/api/v1/${productImage}`"
          />
        </a>
      </div>
      <div class="card__text">
        <div class="text-h6">
          <a :href="'/' + product.code + '/'">{{ product.name }}</a>
        </div>
        <div class="text-subtitle2 text__price">{{ product.price }} ₽</div>
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

const props = defineProps({
  product: {
    type: Object as PropType<ProductMain | SectionMain>,
    required: true,
  },
});

const productImage = computed(() => {
  if (!props.product.images?.length || !props.product.images[0]?.src) {
    return 'images/default.png';
  }
  return props.product.images[0].src;
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
  min-height: 300px;

  .card__section {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: stretch;
    padding: 0;
    position: relative;

    .img__container {
      height: 550px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;

      a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
    }

    a {
      text-decoration: none;
      color: getColor('black', 2);
    }

    .card__img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      object-position: center;
    }

    .card__text {
      font-family: 'Roboto', sans-serif;
      position: relative;
      flex-grow: 1;
      padding-right: 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .text__price {
        color: getColor('grey', 10);
      }
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
