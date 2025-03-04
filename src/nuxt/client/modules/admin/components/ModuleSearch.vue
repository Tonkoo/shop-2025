<template>
  <q-form>
    <div class="q-pa-md example-row-equal-width">
      <div class="row">
        <div class="col-5">
          <areal-select-search
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :model-value="search"
            label="Поиск"
          >
            <template>
              <q-item>
                <q-item-section class="text-grey"> No result </q-item-section>
              </q-item>
            </template>
          </areal-select-search>
        </div>
        <div class="col-5">
          <areal-select-search
            v-model="typeSearch"
            label="Тип"
            :options="options"
          />
        </div>
        <div class="col-1">
          <areal-button
            label="Поиск"
            icon="search"
            class="full-height full-width"
          />
        </div>
        <div class="col-1">
          <areal-button
            label="Очистить"
            icon="close"
            class="full-height full-width"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = [
  { label: 'Разделы', value: 'section' },
  { label: 'Продукты', value: 'product' },
];

const search = ref();
const typeSearch = ref('section');
</script>

<style scoped></style>
