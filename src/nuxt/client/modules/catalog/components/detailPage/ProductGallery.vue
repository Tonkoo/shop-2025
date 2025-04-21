<template>
  <div class="gallery">
    <div
      v-for="(image, index) in detailPageStore.product.images"
      :key="index"
      class="gallery__item"
    >
      <ArealImg :src="image.src" :alt="image.alt" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDetailPageStore } from '~/modules/catalog/stores/detailPageStore';

const detailPageStore = useDetailPageStore();
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
