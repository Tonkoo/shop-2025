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
        <img :src="closeMenu" alt="Previous" />
      </areal-button>
      <div class="dialog-filter__block-sorting">
        <span class="dialog-filter__block-sorting-title">Сортировка</span>
        <div class="dialog-filter__block-radio">
          <q-radio model-value="" val="" label="Без сортировки" color="black" />
          <q-radio model-value="" val="" label="Без новизне" color="black" />
          <q-radio
            model-value=""
            val=""
            label="По возрастанию цены"
            color="black"
          />
          <q-radio
            model-value=""
            val=""
            label="По убыванию цены"
            color="black"
          />
        </div>
      </div>
      <div class="dialog-filter__block-price">
        <span>Цена</span>
        <div class="dialog-filter__input">
          <ArealFormInput :model-value="input1" />
          <ArealFormInput :model-value="input2" />
        </div>
      </div>
      <div class="dialog-filter__block-color">
        <span>Цвет</span>
        <div class="dialog-filter__checkbox">
          <q-checkbox :model-value="color" style="font-size: 25px !important" />
          <q-checkbox :model-value="color" />
          <q-checkbox :model-value="color" />
          <q-checkbox :model-value="color" />
        </div>
      </div>
    </div>
  </ArealDialog>
</template>

<script setup lang="ts">
import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';
import closeMenu from '~/modules/commonUI/assets/icon/menu/closeMenu.svg';

const catalogStore = useCatalogStore();

const dialog = computed(() => catalogStore.dialogFilter);

const input1 = ref('');
const input2 = ref('');
const color = ref(false);
</script>

<style scoped lang="scss">
.dialog-filter {
  &__card {
    position: fixed;
    right: 0;
    width: 520px;
    background: getColor('white', 1);
    border-radius: 0;
    display: flex;
    flex-direction: column;
    padding: 40px;
    gap: 32px;
  }
  &__btn-close {
    position: absolute;
    right: 0;
    top: 0;
    margin: 12px;
  }
  &__block-sorting {
    display: flex;
    flex-direction: column;
    gap: 16px;
    &-title {
      font-size: 16px;
      font-weight: 400;
      line-height: 120%;
      color: getColor('grey', 14);
    }
  }
  &__block-radio {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  &__block-price {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__input {
    display: flex;
    flex-direction: row;
  }
  &__color {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__checkbox {
    display: flex;
    flex-direction: row;
    gap: 6px;
  }
}
</style>
