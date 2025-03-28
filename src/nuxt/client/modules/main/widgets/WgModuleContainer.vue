<template>
  <div class="title-main">Новинки</div>
  <Swiper />
  <div class="title-main">Подарки</div>
  <ProductList />
  <Sidebar />
</template>

<script setup lang="ts">
import Sidebar from '~/modules/main/components/Sidebar.vue';
import Swiper from '~/modules/main/components/Swiper.vue';
import ProductList from '~/modules/main/components/ProductList.vue';
</script>

<style lang="scss">
.sidebar .q-dialog__backdrop {
  top: 64px !important;
}

.title-main {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  font-size: 22px;
  font-weight: 500;
  text-transform: uppercase;
  color: getColor('black', 1);
}
</style>
