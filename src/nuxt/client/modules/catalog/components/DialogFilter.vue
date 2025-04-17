<template>
  <ArealDialog
    :model-value="dialog"
    position="right"
    :transition-show="'fade'"
    :transition-hide="'fade'"
    class="dialog-filter"
  >
    <div class="dialog-filter__card">
      <areal-button
        flat
        round
        dense
        class="dialog-filter__btn-close"
        @click="catalogStore.setDialogFilter()"
      >
        <ArealSvg icon-name="closeMenu" />
      </areal-button>
      <ArealAccordion label="Сортировка" class="dialog-filter__accordion-item">
        <div class="dialog-filter__block-radio">
          <ArealRadio
            v-model="catalogStore.filterCatalog.sort"
            name="catalog-sort"
            value="none"
            label="Без сортировки"
          />
          <ArealRadio
            v-model="catalogStore.filterCatalog.sort"
            name="catalog-sort"
            value="newProduct"
            label="По новизне"
          />
          <ArealRadio
            v-model="catalogStore.filterCatalog.sort"
            name="catalog-sort"
            value="ascPrice"
            label="По возрастанию цены"
          />
          <ArealRadio
            v-model="catalogStore.filterCatalog.sort"
            name="catalog-sort"
            value="descPrice"
            label="По убыванию цены"
          />
        </div>
      </ArealAccordion>
      <ArealAccordion label="Цена" class="dialog-filter__accordion-item">
        <div class="dialog-filter__block-price">
          <ArealFilterInput
            v-model="catalogStore.filterCatalog.priceFrom"
            :label="`от ${catalogStore.filter.price.min}`"
          />
          <ArealFilterInput
            v-model="catalogStore.filterCatalog.priceFrom"
            :label="`до ${catalogStore.filter.price.max}`"
          />
        </div>
      </ArealAccordion>
      <ArealAccordion label="Цвет" class="dialog-filter__accordion-item">
        <div class="dialog-filter__block-color">
          <div
            v-for="(color, index) in catalogStore.filter.color"
            :key="index"
            class="dialog-filter__block-color__wrapper"
            :class="{
              'dialog-filter__block-color__wrapper_checked':
                catalogStore.filterCatalog.color.includes(color),
            }"
            @click="catalogStore.setColor(color)"
          >
            <div
              class="dialog-filter__block-color__circle"
              :style="{ backgroundColor: color }"
            />
          </div>
        </div>
      </ArealAccordion>
    </div>
  </ArealDialog>
</template>

<script setup lang="ts">
import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';

const catalogStore = useCatalogStore();

const dialog = computed(() => catalogStore.dialogFilter);
</script>

<style scoped lang="scss">
.dialog-filter {
  &__card {
    position: fixed;
    right: 0;
    width: 520px;
    background: getColor('white', 1);
    border-radius: 0;
    padding: 40px;
  }
  &__accordion-item {
    border-bottom: 1px solid black;
    //margin-bottom: 24px;
    &:last-child {
      border-bottom: 0;
    }
  }
  &__btn-close {
    position: absolute;
    right: 0;
    top: 0;
    margin: 12px;
  }
  &__block-radio {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  &__block-price {
    padding-top: 4px;
    display: flex;
  }
  &__input {
    display: flex;
    flex-direction: row;
  }
  &__block-color {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    &__wrapper {
      height: 26px;
      width: 26px;
      border-radius: 50%;
      padding: 2px;

      &_checked {
        border: 1px solid getColor('black', 3);
      }
    }
    &__circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  &__checkbox {
    display: flex;
    flex-direction: row;
    gap: 6px;
  }
}
</style>
