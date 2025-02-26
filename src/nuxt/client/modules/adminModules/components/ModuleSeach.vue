<script setup lang="ts"></script>

<template>
  <q-form>
    <div class="q-pa-md example-row-equal-width">
      <div class="row">
        <div class="col-5">
          <q-input square v-model="text" outlined label="Поиск" />
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
