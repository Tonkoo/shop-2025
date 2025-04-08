<template>
  <div class="title-main">Новинки</div>
  <Swiper />
  <div class="title-main">Подарки</div>
  <ProductList />
</template>

<script setup lang="ts">
import Swiper from '~/modules/main/components/Swiper.vue';
import ProductList from '~/modules/main/components/ProductList.vue';
import { notifyNegative } from '~/entities/notify.entites';
import { useMainModule } from '~/modules/main/global';
import { useQuasar } from 'quasar';
</script>

<style lang="scss">
.title-main {
  text-align: center;
  font-size: 22px;
  font-weight: 500;
  text-transform: uppercase;
  color: getColor('black', 1);
}
</style>
