<template>
  <div class="catalog-filter">
    <div class="catalog-filter__breadcrumbs">
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
    <q-space />
    <SwiperChildSection
      v-if="
        !catalogStore.paramCatalog.childCatalogCode &&
        !catalogStore.paramCatalog.nestedChildCatalogCode
      "
    />
    <q-space />
    <div class="catalog-filter__btn">
      <q-btn flat icon="filter_alt">Фильтр</q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import type { ParamCatalog } from '~/interfaces/global';
import SwiperChildSection from '~/modules/catalog/components/SwiperChildSection.vue';

const catalogStore = useCatalogStore();

const router = useRouter();

const route = useRoute();

catalogStore.setParamCatalog(route.params as ParamCatalog);
</script>

<style lang="scss">
.catalog-filter {
  display: flex;
  width: 100%;
  position: relative;
  .catalog-filter__breadcrumbs {
    margin-top: auto;
    margin-left: 10px;
    .breadcrumbs {
      &__link {
        cursor: pointer;
        transition: color 0.3s ease;
      }
      &__link:hover {
        color: getColor('grey', 8);
      }
    }
  }
  .catalog-filter__btn {
    margin-top: auto;
    margin-right: 10px;
  }
}
</style>
