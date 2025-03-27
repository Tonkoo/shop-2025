<template>
  <ClientOnly>
    <div class="swiper__wrapper">
      <swiper-container ref="containerRef" class="swiper">
        <swiper-slide
          v-for="product in mainStores.product"
          :key="product.id"
          class="swiper__slide"
        >
          <q-card class="slide__card">
            <q-card-section>
              <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />
              <div class="text-h6">{{ product.name }}</div>
              <div class="text-subtitle2">{{ product.price }}</div>
            </q-card-section>
          </q-card>
        </swiper-slide>
      </swiper-container>
      <button
        class="s-btn-prev"
        :class="{ hidden: isBeginning }"
        @click="swiperPrev"
      >
        <img src="./../../commonUI/assets/icon/swiperPrev.svg" alt="Previous" />
      </button>
      <button class="s-btn-next" :class="{ hidden: isEnd }" @click="swiperNext">
        <img src="./../../commonUI/assets/icon/swiperNext.svg" alt="Next" />
      </button>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useMainModule } from '~/modules/main/global';
import { useMainStores } from '~/modules/main/stores/mainStores';
import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';

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

// const cards = ref([
//   { id: 1, title: 'Карточка 1' },
//   { id: 2, title: 'Карточка 2' },
//   { id: 3, title: 'Карточка 3' },
//   { id: 4, title: 'Карточка 4' },
//   { id: 5, title: 'Карточка 5' },
// ]);

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
    width: 100%;

    &__slide {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;

      .slide__card {
        width: 100%;
        height: 100%;
        max-height: 450px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: none !important;
        border: none !important;
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

    img {
      width: 24px;
      height: 24px;
      object-fit: contain;
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
