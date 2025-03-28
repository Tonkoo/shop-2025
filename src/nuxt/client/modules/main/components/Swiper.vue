<template>
  <ClientOnly>
    <div class="swiper__wrapper">
      <swiper-container ref="containerRef" class="swiper">
        <swiper-slide
          v-for="product in mainStores.product.filter(
            (item) => item.mainSlider
          )"
          :key="product.id"
          class="swiper__slide"
        >
          <ArealProductCard :product="product" />
        </swiper-slide>
      </swiper-container>
      <button
        class="s-btn-prev"
        :class="{ hidden: isBeginning }"
        @click="swiperPrev"
      >
        <q-img :src="swiperPrevIcon" alt="Previous" />
      </button>
      <button class="s-btn-next" :class="{ hidden: isEnd }" @click="swiperNext">
        <q-img :src="swiperNextIcon" alt="Next" />
      </button>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useMainModule } from '~/modules/main/global';
import { useMainStores } from '~/modules/main/stores/mainStores';
import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';
import swiperNextIcon from '~/modules/commonUI/assets/icon/swiperNext.svg';
import swiperPrevIcon from '~/modules/commonUI/assets/icon/swiperPrev.svg';

const mainModule = useMainModule();
const mainStores = useMainStores();
const quasar = useQuasar();

const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
  slidesPerView: 4,
  spaceBetween: 16,
});

const isBeginning = ref<boolean | undefined>(true);
const isEnd = ref<boolean | undefined>(false);

const swiperNext = () => {
  swiper.next();
  if (swiper.instance) {
    isBeginning.value = swiper.instance.value?.isBeginning;
    isEnd.value = swiper.instance.value?.isEnd;
  }
};
const swiperPrev = () => {
  swiper.prev();
  if (swiper.instance) {
    isBeginning.value = swiper.instance.value?.isBeginning;
    isEnd.value = swiper.instance.value?.isEnd;
  }
};
onMounted(async () => {
  await mainModule.getProduct().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});
</script>

<style scoped lang="scss">
.swiper__wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 50px;
  .swiper {
    position: relative;
    margin: 16px;
    &__slide {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: stretch;
    }
  }

  .s-btn-prev,
  .s-btn-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #7e7c7c;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 10;
    transition: all 0.3s ease;
    overflow: hidden;

    &:hover {
      background-color: #5a5959;
      transform: translateY(-50%) scale(1.1);
    }
  }

  .s-btn-prev {
    left: 10px;
  }

  .s-btn-next {
    right: 10px;
  }
}
</style>
