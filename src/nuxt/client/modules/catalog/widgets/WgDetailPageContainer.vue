<template>
  <div class="detail-container">
    <ProductGallery class="detail-container__gallery" />
    <div class="detail-container__information-block">
      <ArealBreadcrumbs />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductGallery from '~/modules/catalog/components/detailPage/ProductGallery.vue';
</script>

<style scoped lang="scss">
.detail-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  &__gallery {
    flex: 1;
  }
  &__information-block {
    width: calc(1 / 3) * 100%;
    padding: 0 40px;
  }
}
</style>
