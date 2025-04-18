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
      <div v-if="hasActiveFilters" class="dialog-filter__tags-wrapper">
        <div
          v-if="catalogStore.filterCatalog.priceFrom"
          class="dialog-filter__tags"
          @click="catalogStore.filterCatalog.priceFrom = ''"
        >
          <span>от {{ catalogStore.filterCatalog.priceFrom }}</span>
          <ArealSvg size="S" icon-name="CloseIcon" />
        </div>
        <div
          v-if="catalogStore.filterCatalog.priceTo"
          class="dialog-filter__tags"
          @click="catalogStore.filterCatalog.priceTo = ''"
        >
          <span>до {{ catalogStore.filterCatalog.priceTo }}</span>
          <ArealSvg size="S" icon-name="CloseIcon" />
        </div>
        <div
          v-for="color in catalogStore.filterCatalog.color"
          :key="color"
          class="dialog-filter__tags"
          @click="catalogStore.removeColor(color)"
        >
          <div
            class="dialog-filter__tags__circle"
            :style="{ backgroundColor: color }"
          />
          <ArealSvg size="S" icon-name="CloseIcon" />
        </div>
      </div>
      <div class="dialog-filter__block-filter">
        <ArealAccordion
          label="Сортировка"
          class="dialog-filter__accordion-item"
        >
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
              :placeholder="`от ${catalogStore.filter.price.min}`"
              :debounce="400"
              :max="catalogStore.filter.price.max"
              @update:model-value="getOnlyFilter"
            />
            <ArealFilterInput
              v-model="catalogStore.filterCatalog.priceTo"
              :debounce="400"
              :max="catalogStore.filter.price.max"
              :placeholder="`до ${catalogStore.filter.price.max}`"
              @update:model-value="getOnlyFilter"
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
                'dialog-filter__block-color__wrapper_disabled':
                  !catalogStore.availableColors.includes(color),
              }"
              @click="setColorFilter(color)"
            >
              <div
                class="dialog-filter__block-color__circle"
                :style="{ backgroundColor: color }"
              />
            </div>
          </div>
        </ArealAccordion>
      </div>

      <div class="dialog-filter__footer">
        <ArealButton
          flat
          square
          class="dialog-filter__footer__button dialog-filter__footer__button_black"
          :label="`Показать(${catalogStore.totalItems})`"
          @click="getFilteredData()"
        />
        <ArealButton
          square
          flat
          class="dialog-filter__footer__button dialog-filter__footer__button_white"
          label="Очистить"
          @click="clearFilter()"
        />
      </div>
    </div>
  </ArealDialog>
</template>

<script setup lang="ts">
import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import { useCatalogModule } from '~/modules/catalog/global';

const catalogStore = useCatalogStore();
const catalogModule = useCatalogModule();

const hasActiveFilters = computed(() => {
  return (
    catalogStore.filterCatalog.priceFrom ||
    catalogStore.filterCatalog.priceTo ||
    catalogStore.filterCatalog.color.length > 0
  );
});

const getFilteredData = () => {
  catalogModule.getItemCatalog();
  catalogStore.setDialogFilter();
};

const getOnlyFilter = () => {
  catalogStore.setOnlyFilter(true);
  catalogModule.getItemCatalog();
};

const clearFilter = () => {
  catalogStore.setOnlyFilter(true);
  catalogStore.clearFilter();
  catalogModule.getItemCatalog();
};

const setColorFilter = (color: string) => {
  catalogStore.setOnlyFilter(true);
  catalogStore.setColor(color);
  catalogModule.getItemCatalog();
};

const dialog = computed(() => catalogStore.dialogFilter);
</script>

<style scoped lang="scss">
.dialog-filter {
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
  &__tags-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }
  &__tags {
    display: inline-flex;
    align-items: center;
    padding: 5px;
    background-color: getColor('black', 1);
    color: getColor('white', 1);
    font-size: 12px;
    column-gap: 4px;
    &__circle {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid getColor('white', 1);
    }
  }

  &__block-filter {
    flex-grow: 1;
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
      &_disabled {
        opacity: 0.5;
        pointer-events: none;
        cursor: not-allowed;
      }
    }
    &__circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  &__footer {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    &__button {
      width: 100%;

      &_black {
        background-color: getColor('black', 1) !important;
        color: getColor('white', 1);
      }
      &_white {
        border: 1px solid getColor('grey', 15);
        &:hover {
          background-color: transparent;
          border-color: getColor('grey', 13);
          color: getColor('grey', 12);
        }
      }
    }
  }
}
</style>
