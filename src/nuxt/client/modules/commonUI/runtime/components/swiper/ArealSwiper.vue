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
      :class="{ hidden: isBeginning }"
      @click="swiperPrev"
    >
      <q-img :src="swiperPrevIcon" alt="Previous" />
    </button>
    <button
      class="swiper__btn-next"
      :class="{ hidden: isEnd }"
      @click="swiperNext"
    >
      <q-img :src="swiperNextIcon" alt="Next" />
    </button>
  </ClientOnly>
</template>

<script setup lang="ts">
import swiperPrevIcon from '~/modules/commonUI/assets/icon/swiper/swiperPrev.svg';
import swiperNextIcon from '~/modules/commonUI/assets/icon/swiper/swiperNext.svg';
import type { ProductMain, SectionMain } from '~/interfaces/global';

interface Props {
  dataItems: Array<ProductMain | SectionMain>;
  filterValue?: string;
}

const props = defineProps<Props>();

const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
  slidesPerView: 4,
  spaceBetween: 24,
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
