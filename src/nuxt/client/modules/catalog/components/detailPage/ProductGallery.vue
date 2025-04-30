<template>
  <div class="gallery">
    <div
      v-for="(image, index) in product.images"
      :key="index"
      class="gallery__item"
    >
      <ArealImg :src="image.src" :alt="image.alt" />
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
</script>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  &__item {
    width: 100%;
    height: 100%;
  }
}
</style>
