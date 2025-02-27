<script setup lang="ts"></script>

<template>
  <q-form>
    <div class="q-pa-md example-row-equal-width">
      <div class="row">
        <div class="col-5">
          <q-select
            square
            outlined
            label="Поиск"
            :model-value="search"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
          >
            <template>
              <q-item>
                <q-item-section class="text-grey"> No result </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-5">
          <q-select square outlined v-model="model" label="Тип" />
        </div>
        <div class="col-1">
          <q-btn
            outline
            style="color: black"
            label="Поиск"
            icon="search"
            class="full-height full-width"
          />
        </div>
        <div class="col-1">
          <q-btn
            flat
            style="color: #4e4e4e"
            label="Очистить"
            icon="close"
            class="full-height full-width"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>

<style scoped></style>
