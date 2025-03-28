<template>
  <div class="q-pa-md">
    <div class="row catalog-list">
      <div
        v-for="product in mainStores.product.filter((item) => item.showOnMain)"
        :key="product.id"
        class="col-3 catalog-list__cards"
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
.catalog-list {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 50px;
  &__cards {
    width: 23%;
  }
}
</style>
