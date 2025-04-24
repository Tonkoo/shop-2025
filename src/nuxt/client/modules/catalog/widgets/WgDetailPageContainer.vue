<template>
  <div class="detail-container">
    <ProductGallery
      :product="detailPageStore.product"
      class="detail-container__gallery"
    />
    <ProductAbout :product="detailPageStore.product" />
  </div>
</template>

<script setup lang="ts">
import ProductGallery from '~/modules/catalog/components/detailPage/ProductGallery.vue';
import { useDetailPageStore } from '~/modules/catalog/stores/detailPageStore';
import ProductAbout from '~/modules/catalog/components/detailPage/ProductAbout.vue';

const detailPageStore = useDetailPageStore();
</script>

<style scoped lang="scss">
.detail-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  &__gallery {
    flex: 1;
  }
}
</style>
