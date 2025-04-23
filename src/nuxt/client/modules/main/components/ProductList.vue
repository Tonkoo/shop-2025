<template>
  <div class="catalog-wrapper">
    <div class="catalog-list">
      <div
        v-for="product in mainGifts"
        :key="product.id"
        class="catalog-list__cards"
      >
        <ArealProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductMain } from '~/interfaces/global';

defineProps({
  mainGifts: {
    type: Object as PropType<ProductMain[]>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.catalog-wrapper {
  width: 100%;

  .catalog-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}
</style>
