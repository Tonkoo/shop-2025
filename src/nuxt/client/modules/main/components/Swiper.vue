<template>
  <areal-swiper :data-items="mainStores.product" filter-key="mainSlider">
    <template #default="{ item }">
      <ArealProductCard :product="item" />
    </template>
  </areal-swiper>
</template>

<script setup lang="ts">
import { useMainModule } from '~/modules/main/global';
import { useMainStores } from '~/modules/main/stores/mainStores';
import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';

const mainModule = useMainModule();
const mainStores = useMainStores();
const quasar = useQuasar();

onMounted(async () => {
  await mainModule.getProduct().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});
</script>

<style scoped lang="scss"></style>
