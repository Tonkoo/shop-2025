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
        @click="emit('close-dialog')"
      >
        <ArealSvg icon-name="closeMenu" />
      </areal-button>
      <div v-if="hasActiveFilters" class="dialog-filter__tags-wrapper">
        <ArealTag
          v-if="filterCatalog.priceFrom"
          class="dialog-filter__tags"
          @click="emit('update:filter', { property: 'priceFrom', value: '' })"
        >
          <span>от {{ filterCatalog.priceFrom }}</span>
        </ArealTag>
        <ArealTag
          v-if="filterCatalog.priceTo"
          class="dialog-filter__tags"
          @click="emit('update:filter', { property: 'priceTo', value: '' })"
        >
          <span>до {{ filterCatalog.priceTo }}</span>
        </ArealTag>
        <ArealTag
          v-for="color in filterCatalog.color"
          :key="color"
          class="dialog-filter__tags"
          @click="emit('update:filter', { property: 'color', value: color })"
        >
          <div
            class="dialog-filter__tags__circle"
            :style="{ backgroundColor: color }"
          />
        </ArealTag>
      </div>
      <div class="dialog-filter__block-filter">
        <ArealAccordion
          label="Сортировка"
          class="dialog-filter__accordion-item"
        >
          <div class="dialog-filter__block-radio">
            <ArealRadio
              :model-value="filterCatalog.sort"
              name="catalog-sort"
              value="none"
              label="Без сортировки"
            />
            <ArealRadio
              :model-value="filterCatalog.sort"
              name="catalog-sort"
              value="newProduct"
              label="По новизне"
            />
            <ArealRadio
              :model-value="filterCatalog.sort"
              name="catalog-sort"
              value="ascPrice"
              label="По возрастанию цены"
            />
            <ArealRadio
              :model-value="filterCatalog.sort"
              name="catalog-sort"
              value="descPrice"
              label="По убыванию цены"
            />
          </div>
        </ArealAccordion>
        <ArealAccordion label="Цена" class="dialog-filter__accordion-item">
          <div class="dialog-filter__block-price">
            <ArealFilterInput
              :model-value="filterCatalog.priceFrom"
              :placeholder="`от ${filter.price.min}`"
              :debounce="400"
              :max="filter.price.max"
              @update:model-value="
                (value) =>
                  emit('update:filter', { property: 'priceFrom', value: value })
              "
            />
            <ArealFilterInput
              :model-value="filterCatalog.priceTo"
              :debounce="400"
              :max="filter.price.max"
              :placeholder="`до ${filter.price.max}`"
              @update:model-value="
                (value) =>
                  emit('update:filter', { property: 'priceTo', value: value })
              "
            />
          </div>
        </ArealAccordion>
        <ArealAccordion label="Цвет" class="dialog-filter__accordion-item">
          <div class="dialog-filter__block-color">
            <div
              v-for="(color, index) in filter.color"
              :key="index"
              class="dialog-filter__block-color__wrapper"
              :class="{
                'dialog-filter__block-color__wrapper_checked':
                  filterCatalog.color.includes(color),
                'dialog-filter__block-color__wrapper_disabled':
                  !availableColors.includes(color),
              }"
              @click="
                emit('update:filter', { property: 'color', value: color })
              "
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
          :label="`Показать(${totalItems})`"
          @click="emit('filter')"
        />
        <ArealButton
          square
          flat
          class="dialog-filter__footer__button dialog-filter__footer__button_white"
          label="Очистить"
          @click="emit('clear-filter')"
        />
      </div>
    </div>
  </ArealDialog>
</template>

<script setup lang="ts">
import type { FilterCatalog, FilterStore } from '~/interfaces/global';

const props = defineProps({
  filterCatalog: {
    type: Object as PropType<FilterStore>,
    required: true,
  },
  filter: {
    type: Object as PropType<FilterCatalog>,
    required: true,
  },
  availableColors: {
    type: Array as PropType<string[]>,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  dialogFilter: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits([
  'clear-filter',
  'filter',
  'close-dialog',
  'update:filter',
]);

const dialog = computed(() => props.dialogFilter);

const hasActiveFilters = computed(() => {
  return (
    props.filterCatalog.priceFrom ||
    props.filterCatalog.priceTo ||
    props.filterCatalog.color.length > 0
  );
});
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
    padding-bottom: 8px;
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
