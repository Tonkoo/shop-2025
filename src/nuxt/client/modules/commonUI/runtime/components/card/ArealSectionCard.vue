<template>
  <div class="card">
    <div class="card__section">
      <div class="card__img">
        <areal-link :link="section.url">
          <areal-img
            :src="section.images.length ? section.images[0].src : ''"
          />
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
import type { SectionMain } from '~/interfaces/global';

defineProps({
  section: {
    type: Object as PropType<SectionMain>,
    required: true,
  },
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
