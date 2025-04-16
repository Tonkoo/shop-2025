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
          <q-radio
            size="xs"
            model-value=""
            val=""
            label="Без сортировки"
            color="black"
          />
          <q-radio
            size="xs"
            model-value=""
            val=""
            label="Без новизне"
            color="black"
          />
          <q-radio
            size="xs"
            model-value=""
            val=""
            label="По возрастанию цены"
            color="black"
          />
          <q-radio
            size="xs"
            model-value=""
            val=""
            label="По убыванию цены"
            color="black"
          />
        </div>
      </ArealAccordion>
    </div>
  </ArealDialog>
</template>

<script setup lang="ts">
import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';

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
    padding: 40px;
  }
  &__accordion-item {
    border-bottom: 1px solid black;

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
