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
          <q-card class="slide__card">
            <q-card-section class="card__section">
              <q-img
                class="card__img"
                :src="`http://localhost/api/v1/${product.images[0].src}`"
              />
              <div class="card__text">
                <div class="text-h6">{{ product.name }}</div>
                <div class="text-subtitle2">{{ product.price }} ₽</div>
                <div
                  class="section__circle"
                  :style="{ backgroundColor: product.color }"
                />
              </div>
            </q-card-section>
          </q-card>
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
  .swiper {
    position: relative;
    margin: 10px;
    &__slide {
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;

      .slide__card {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: none !important;
        border: none !important;
        overflow: hidden;

        .card__section {
          display: flex;
          flex-direction: column;
          padding: 0;

          .card__img {
            width: 100%;
            height: 80%;
            object-fit: contain;
            background-color: #f5f5f5;
            margin-bottom: 12px;
          }

          .card__text {
            position: relative;
            padding-right: 25px;
          }
          .section__circle {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 15px;
            height: 15px;
            border: 2px solid black;
            border-radius: 50%;
          }
        }
      }
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
