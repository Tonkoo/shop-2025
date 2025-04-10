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
    <button
      class="swiper__btn-prev"
      :hidden="isBeginning()"
      @click="swiperPrev"
    >
      <q-img :src="swiperPrevIcon" alt="Previous" />
    </button>
    <!--    :hidden="isEnd"-->
    <button class="swiper__btn-next" @click="swiperNext">
      <q-img :src="swiperNextIcon" alt="Next" />
    </button>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';
import swiperPrevIcon from '~/modules/commonUI/assets/icon/swiper/swiperPrev.svg';
import swiperNextIcon from '~/modules/commonUI/assets/icon/swiper/swiperNext.svg';
import type { ProductMain, SectionMain } from '~/interfaces/global';

interface Props {
  dataItems: Array<ProductMain | SectionMain>;
  filterValue?: string;
}

// register();

// const isBeginning = computed<boolean>(() => {
//   return swiper.instance?.value?.isBeginning ?? false;
// });

const isBeginning = () => {
  console.log(swiper.instance?.value?.isEnd);
  return swiper.instance?.value?.isBeginning ?? false;
};

// const isEnd = computed<boolean>(() => {
//   console.log(swiper.instance?.value);
//   return swiper.instance?.value?.isEnd ?? false;
// });

const props = defineProps<Props>();

const containerRef = ref<SwiperContainer | null>(null);
const swiper = useSwiper(containerRef, {
  slidesPerView: 4,
  spaceBetween: 24,
});

const swiperNext = () => {
  swiper.next();
};
const swiperPrev = () => {
  swiper.prev();
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
    z-index: 1;
    opacity: 0.45;
    transition: opacity 0.3s ease;
    border-radius: 42px;
    border: none;

    &:hover {
      opacity: 1;
    }
  }
  &__btn-prev {
    left: 24px;
  }
  &__btn-next {
    right: 24px;
  }
}
</style>
