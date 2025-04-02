<template>
  <q-card class="slide__card">
    <q-card-section class="card__section">
      <div class="img__container">
        <!--TODO: универсальный метод для склейки ссылки на страницу-->
        <a :href="'/' + product.code + '/'">
          <!--TODO: q-img -> ArealImg-->
          <q-img class="card__img" :src="productImage" />
        </a>
      </div>
      <div class="card__text">
        <div class="text-h6">
          <a :href="'/' + product.code + '/'">{{ product.name }}</a>
        </div>
        <span class="text-subtitle2 text__price">{{ product.price }} ₽</span>
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
@import '~/modules/commonUI/assets/scss/card/card';
</style>
