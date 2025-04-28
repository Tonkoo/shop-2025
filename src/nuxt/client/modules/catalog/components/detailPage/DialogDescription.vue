<template>
  <ArealDialog
    :model-value="dialog"
    position="right"
    :transition-show="'fade'"
    :transition-hide="'fade'"
    class="dialog-description"
  >
    <div class="dialog-description__card">
      <areal-button
        flat
        round
        dense
        class="dialog-description__btn-close"
        @click="emit('close-dialog')"
      >
        <ArealSvg icon-name="closeMenu" />
      </areal-button>
      <div class="dialog-description__list">
        <div class="dialog-description__list__item">
          <span class="dialog-description__list__item__title">{{
            $t('catalog.label.article')
          }}</span>
          <span class="dialog-description__list__item__text">{{
            product.code
          }}</span>
        </div>
        <div class="dialog-description__list__item">
          <span class="dialog-description__list__item__title">{{
            $t('catalog.label.section')
          }}</span>
          <span class="dialog-description__list__item__text">{{
            product.sectionName
          }}</span>
        </div>
        <div class="dialog-description__list__item">
          <span class="dialog-description__list__item__title">{{
            $t('catalog.label.description')
          }}</span>
          <span class="dialog-description__list__item__text">{{
            product.description
          }}</span>
        </div>
      </div>
    </div>
  </ArealDialog>
</template>

<script setup lang="ts">
import type { ProductMain } from '~/interfaces/global';

defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  product: {
    type: Object as PropType<ProductMain>,
    required: true,
  },
});

const emit = defineEmits(['close-dialog']);
</script>

<style scoped lang="scss">
.dialog-description {
  &__card {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    width: 520px;
    background: getColor('white', 1);
    border-radius: 0;
    padding: 40px;
  }
  &__btn-close {
    position: absolute;
    right: 0;
    top: 0;
    margin: 12px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
    &__item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      &__title {
        @include font-preset('Text/16px');
        color: getColor('grey', 13);
      }
      &__text {
        @include font-preset('Text/14px');
        color: getColor('grey', 12);
      }
    }
  }
}
</style>
