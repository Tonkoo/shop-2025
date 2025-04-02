<template>
  <q-card class="slide__card">
    <q-card-section class="card__section">
      <div class="img__container">
        <a :href="'/' + section.code + '/'">
          <q-img class="card__img" :src="sectionImage" />
        </a>
      </div>
      <div class="card__text card__text-section">
        <div class="text-h6">
          <a :href="'/' + section.code + '/'">{{ section.name }}</a>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { ProductMain, SectionMain } from '~/interfaces/global';

const props = defineProps({
  section: {
    type: Object as PropType<ProductMain | SectionMain>,
    required: true,
  },
});

const sectionImage = computed(() => {
  if (!props.section.images?.length || !props.section.images[0]?.src) {
    return 'images/default.png';
  }
  return props.section.images[0].src;
});
</script>

<style scoped lang="scss">
@import '~/modules/commonUI/assets/scss/card/card';
@import '~/modules/commonUI/assets/scss/card/card.modifiers';
</style>
