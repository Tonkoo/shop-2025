<template>
  <div class="card">
    <div class="card__section">
      <div class="card__img">
        <areal-link :link="section.url">
          <areal-img :src="sectionImage" />
        </areal-link>
      </div>
      <div class="card__description">
        <areal-link class="card__description-link" :link="section.url">
          {{ section.name }}
        </areal-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductMain, SectionMain } from '~/interfaces/global';
import defaultSVG from '~/modules/commonUI/assets/icon/default.svg';

const props = defineProps({
  section: {
    type: Object as PropType<ProductMain | SectionMain>,
    required: true,
  },
});

const sectionImage = computed(() => {
  if (!props.section.images?.length || !props.section.images[0]?.src) {
    return defaultSVG;
  }
  return new URL(props.section.images[0].src, 'http://localhost').toString();
});
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  height: 100%;

  &__section {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  &__description {
    text-align: center;
    &-link {
      color: getColor('grey', 12);
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
