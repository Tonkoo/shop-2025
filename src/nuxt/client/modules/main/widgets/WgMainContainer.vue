<template>
  <div class="main-slider">
    <div class="slider">
      <span class="slider__title">{{ $t('main.title.slider') }}</span>
      <Swiper :main-slider="dataSwiper" />
      <ArealLink class="slider__link" link="catalog/muzhskoy/">{{
        $t('main.body.link')
      }}</ArealLink>
    </div>
  </div>
  <div class="main-list">
    <div class="product-list">
      <span class="product-list__title">{{ $t('main.title.gifts') }}</span>
      <ProductList :main-gifts="dataList" />
      <ArealLink class="product-list__link" link="catalog/zhenskiy/">{{
        $t('main.body.link')
      }}</ArealLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from '~/modules/main/components/Swiper.vue';
import ProductList from '~/modules/main/components/ProductList.vue';
import { useMainStores } from '~/modules/main/stores/mainStores';
import { useMainModule } from '~/modules/main/global';
import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';

const mainModule = useMainModule();
const quasar = useQuasar();
const mainStores = useMainStores();

onMounted(async () => {
  await mainModule.getItems().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});

const dataSwiper = computed(() => mainStores.mainSlider);
const dataList = computed(() => mainStores.mainGifts);
</script>

<style scoped lang="scss">
.main-slider {
  padding: 0 40px;
}
.slider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 24px;
  width: 100%;
  &__title {
    @include font-preset('H2/22/Text');
    color: getColor('black', 1);
  }
  &__link {
    @include font-preset('Text/14px');
    border-bottom: 1px solid getColor('black', 1);
    color: getColor('black', 1);
  }
}
.main-list {
  padding: 0 40px;
}
.product-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  &__title {
    @include font-preset('H2/22/Text');
    color: getColor('black', 1);
  }
  &__link {
    @include font-preset('Text/14px');
    border-bottom: 1px solid getColor('black', 1);
    color: getColor('black', 1);
  }
}
</style>
