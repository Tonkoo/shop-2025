<template>
  <ClientOnly>
    <div class="swiper__wrapper">
      <swiper-container ref="containerRef" class="swiper">
        <swiper-slide
          v-for="item in filteredItems"
          :key="item.id"
          class="swiper__slide"
        >
          <slot :item="item" />
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
import swiperPrevIcon from '~/modules/commonUI/assets/icon/swiperPrev.svg';
import swiperNextIcon from '~/modules/commonUI/assets/icon/swiperNext.svg';
import type { ProductMain, SectionMain } from '~/interfaces/global';

interface Props {
  dataItems: Array<ProductMain | SectionMain>;
  filterKey?: string;
}

const props = defineProps<Props>();

const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
  slidesPerView: 4,
  spaceBetween: 16,
});

const isBeginning = ref<boolean | undefined>(true);
const isEnd = ref<boolean | undefined>(false);

const filteredItems = computed(() => {
  return props.filterKey
    ? props.dataItems.filter(
        (item) => item[props.filterKey as keyof typeof item]
      )
    : props.dataItems;
});

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

<style scoped>
.swiper__wrapper {
  position: relative;
  width: 100%;
  //margin-bottom: 50px;
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
