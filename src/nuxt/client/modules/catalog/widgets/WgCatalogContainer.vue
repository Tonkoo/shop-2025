<template>
  <div class="filter-wrapper">
    <div class="catalog-filter">
      <div class="catalog-filter__left">
        <ArealBreadcrumbs :title="catalogStore.contentName" />
      </div>
      <div class="catalog-filter__swiper">
        <SwiperChildSection
          v-if="catalogStore.childSection"
          :child-section="catalogStore.childSection"
        />
      </div>

      <div
        v-if="catalogStore.itemCatalog.length !== 0"
        class="catalog-filter__right"
      >
        <div
          class="catalog-filter__btn"
          @click="catalogStore.setDialogFilter()"
        >
          <span>{{ $t('catalog.label.filter') }}</span>
          <ArealSvg icon-name="btnFilter" />
        </div>
      </div>
    </div>
  </div>
  <div class="wg-container">
    <div
      v-if="catalogStore.itemCatalog.length !== 0"
      class="wg-container__product-list"
    >
      <CatalogProduct :item-catalog="catalogStore.itemCatalog" />
    </div>
    <div v-else class="wg-container__block-message">
      <span class="wg-container__block-message__title">{{
        $t('catalog.error.title')
      }}</span>
      <span class="wg-container__block-message__text">{{
        $t('catalog.error.text')
      }}</span>
    </div>
  </div>

  <DialogFilter
    :dialog-filter="catalogStore.dialogFilter"
    :filter-catalog="catalogStore.filterCatalog"
    :filter="catalogStore.filter"
    :sorting-items="catalogStore.sortingItems"
    :available-colors="catalogStore.availableColors"
    :total-items="catalogStore.totalItems"
    @clear-filter="clearFilter"
    @filter="getFilteredData"
    @close-dialog="catalogStore.setDialogFilter()"
    @update:filter="updateFilter"
  />
</template>

<script setup lang="ts">
import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import { useCatalogModule } from '~/modules/catalog/global';
import SwiperChildSection from '~/modules/catalog/components/catalog/SwiperChildSection.vue';
import CatalogProduct from '~/modules/catalog/components/catalog/CatalogProduct.vue';
import DialogFilter from '~/modules/catalog/components/catalog/DialogFilter.vue';
import type { EmitUpdateFilter } from '~/interfaces/catalogGlobal';

const catalogStore = useCatalogStore();
const catalogModule = useCatalogModule();

const updateFilter = (params: EmitUpdateFilter) => {
  switch (params.property) {
    case 'priceFrom':
      catalogStore.setFilterPrice(true);
      catalogStore.setPriceFrom(params.value);
      getOnlyFilter();
      break;
    case 'priceTo':
      catalogStore.setFilterPrice(true);
      catalogStore.setPriceTo(params.value);
      getOnlyFilter();
      break;
    case 'color':
      catalogStore.setColor(params.value);
      getOnlyFilter();
      break;
  }
};

const getOnlyFilter = () => {
  catalogStore.setOnlyFilter(true);
  catalogStore.setGetFilter(true);
  catalogStore.setGetSorting(false);
  catalogModule.getItemCatalog();
};

const getFilteredData = () => {
  catalogStore.setGetFilter(false);
  catalogStore.setGetSorting(false);
  catalogModule.getItemCatalog();
  catalogStore.setDialogFilter();
};

const clearFilter = () => {
  catalogStore.setOnlyFilter(true);
  catalogStore.setGetFilter(true);
  catalogStore.setGetSorting(false);
  catalogStore.clearFilter();
  catalogModule.getItemCatalog();
};
</script>

<style scoped lang="scss">
.catalog-filter {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 40px;
  gap: 48px;
  align-items: end;
  &__left {
    flex-basis: 50%;
    .breadcrumbs {
      color: getColor('grey', 12);
      &__link {
        cursor: pointer;
        color: getColor('grey', 12);
        transition: color 0.3s ease;
      }
      &__link:hover {
        color: getColor('grey', 8);
      }
    }
  }
  &__swiper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 100%;
  }
  &__right {
    flex-basis: 50%;
    display: flex;
    justify-content: flex-end;
  }
  &__btn {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: color 0.3s ease;
    color: getColor('grey', 12);
    &:hover {
      color: getColor('grey', 8);
    }
  }
}
.wg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex: 1;
  &__product-list {
    flex: 1;
  }
  &__block-message {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
    color: getColor('grey', 12);
    &__title {
      @include font-preset('H2/22/Text');
    }
    &__text {
      @include font-preset('Text/14px');
    }
  }
}
</style>
