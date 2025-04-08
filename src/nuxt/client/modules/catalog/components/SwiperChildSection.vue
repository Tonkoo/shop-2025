<template>
  <div class="swiper">
    <ArealSwiper :data-items="mainStores.mainSlider" filter-key="mainSlider">
      <template #default="{ item }">
        <ArealSectionCard :section="item" />
      </template>
    </ArealSwiper>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import { useMainStores } from '~/modules/main/stores/mainStores';
import { notifyNegative } from '~/entities/notify.entites';
import { useMainModule } from '~/modules/main/global';
import { useQuasar } from 'quasar';

const quasar = useQuasar();
const mainModule = useMainModule();
const mainStores = useMainStores();
const catalogStore = useCatalogStore();

// onMounted(async () => {
//   await mainModule.getProduct().catch((err) => {
//     quasar.notify({
//       ...notifyNegative,
//       message: err,
//     });
//   });
// });
</script>

<style scoped lang="scss">
.swiper {
  width: 750px;
}
</style>
