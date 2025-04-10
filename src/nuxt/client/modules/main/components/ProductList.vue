<template>
  <div class="catalog-wrapper">
    <div class="catalog-list">
      <!--      TODO: вынести в computed-->
      <div
        v-for="product in mainStores.mainGifts"
        :key="product.id"
        class="catalog-list__cards"
      >
        <ArealProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStores } from '~/modules/main/stores/mainStores';

const mainStores = useMainStores();
</script>

<style scoped lang="scss">
.catalog-wrapper {
  width: 100%;
  padding: 0 20px;

  .catalog-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 24px;
  }
}
</style>
