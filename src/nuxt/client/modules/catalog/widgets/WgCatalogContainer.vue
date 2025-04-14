<template>
  <div class="filter-wrapper">
    <div class="catalog-filter">
      <div class="catalog-filter__left">
        <q-breadcrumbs separator="|" active-color="black" class="breadcrumbs">
          <q-breadcrumbs-el
            label="Назад"
            icon="arrow_back_ios"
            class="breadcrumbs__link"
            @click="router.back()"
          />
          <q-breadcrumbs-el label="12312" />
        </q-breadcrumbs>
      </div>
      <div class="swiper">
        <SwiperChildSection v-if="isChildSection" />
      </div>

      <div class="catalog-filter__right">
        <div class="catalog-filter__btn">
          <span>{{ $t('catalog.label.filter') }}</span>
          <img :src="btnFilter" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="product-list">
    <CatalogProduct />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import type { ParamCatalog } from '~/interfaces/global';
import SwiperChildSection from '~/modules/catalog/components/SwiperChildSection.vue';
import btnFilter from '~/modules/commonUI/assets/icon/catalog/btnFilter.svg';
import CatalogProduct from '~/modules/catalog/components/CatalogProduct.vue';

const catalogStore = useCatalogStore();

const router = useRouter();

const route = useRoute();

catalogStore.setParamCatalog(route.params as ParamCatalog);

const isChildSection = computed(() => {
  if (!Object.keys(catalogStore.paramCatalog).length) {
    return true;
  }
  return !catalogStore.paramCatalog.childCatalogCode;
});
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
  &__right {
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
</style>
