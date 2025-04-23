<template>
  <div class="slider">
    <ArealSwiper :data-items="childSection">
      <template #default="{ item }">
        <ArealSectionCard :section="item" />
      </template>
    </ArealSwiper>
  </div>
</template>

<script setup lang="ts">
import type { SectionMain } from '~/interfaces/global';

defineProps({
  childSection: {
    type: Array as PropType<SectionMain[]>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.slider {
  position: relative;
  max-width: 716px;
}
</style>
