<template>
  <div class="card">
    <div class="card-section">
      <div class="card-section__img">
        <!--TODO: универсальный метод для склейки ссылки на страницу-->

        <areal-link :link="createLink(product.code)">
          <areal-img class="card__img" :src="productImage" />
        </areal-link>
      </div>
      <div class="text-block">
        <div class="text-block__title">
          <areal-link :link="createLink(product.code)">
            {{ product.name }}
          </areal-link>
        </div>
        <span class="text-block__price">{{ product.price }} ₽</span>
        <div
          class="text-block__circle"
          :style="{ backgroundColor: product.color }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductMain, SectionMain } from '~/interfaces/global';
import defaultSVG from '~/modules/commonUI/assets/icon/default.svg';
import { createLink } from '~/modules/main/utils/createLink.utils';

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
//@import '~/modules/commonUI/assets/scss/card/card';
.card {
  .card-section {
  }
}
</style>
