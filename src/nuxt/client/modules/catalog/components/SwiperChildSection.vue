<template>
  <div class="slider">
    <ArealSwiper :data-items="catalogStore.childSection">
      <template #default="{ item }">
        <ArealSectionCard :section="item" />
      </template>
    </ArealSwiper>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';

const catalogStore = useCatalogStore();
</script>

<style scoped lang="scss">
.slider {
  position: relative;
  max-width: 716px;
}
</style>
