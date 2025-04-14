<template>
  <ClientOnly>
    <swiper-container ref="containerRef" class="swiper">
      <swiper-slide
        v-for="item in props.dataItems"
        :key="item.id"
        class="swiper__slide"
      >
        <slot :item="item" />
      </swiper-slide>
    </swiper-container>
    <button class="swiper__btn-prev" :hidden="isBeginning" @click="swiperPrev">
      <q-img :src="swiperPrevIcon" alt="Previous" />
    </button>

    <button class="swiper__btn-next" :hidden="isEnd" @click="swiperNext">
      <q-img :src="swiperNextIcon" alt="Next" />
    </button>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element';
import swiperPrevIcon from '~/modules/commonUI/assets/icon/swiper/swiperPrev.svg';
import swiperNextIcon from '~/modules/commonUI/assets/icon/swiper/swiperNext.svg';
import type { ProductMain, SectionMain } from '~/interfaces/global';

interface Props {
  dataItems: Array<ProductMain | SectionMain>;
  filterValue?: string;
}

const containerRef = ref<SwiperContainer | null>(null);
const swiper = useSwiper(containerRef, {
  slidesPerView: 4,
  spaceBetween: 24,
});

const isBeginning = ref(true);
const isEnd = ref(false);

const updateSwiperState = () => {
  setTimeout(() => {
    if (swiper.instance?.value) {
      isBeginning.value = swiper.instance.value.isBeginning;
      isEnd.value = swiper.instance.value.isEnd;
    }
  }, 100);
};

onMounted(() => updateSwiperState());

const props = defineProps<Props>();

const swiperNext = () => {
  swiper.next();
  updateSwiperState();
};
const swiperPrev = () => {
  swiper.prev();
  updateSwiperState();
};
</script>

<style scoped lang="scss">
.swiper {
  display: inline-grid;
  position: relative;
  cursor: grab;
  width: 100%;
  &__slide {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
  &__btn-prev,
  &__btn-next {
    cursor: pointer;
    width: 42px;
    height: 42px;
    background-color: getColor('black', 1);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    opacity: 0.45;
    transition: opacity 0.3s ease;
    border-radius: 50%;
    border: none;

    &:hover {
      opacity: 1;
    }
  }
  &__btn-prev {
    left: 0;
  }
  &__btn-next {
    right: 0;
  }
}
</style>
