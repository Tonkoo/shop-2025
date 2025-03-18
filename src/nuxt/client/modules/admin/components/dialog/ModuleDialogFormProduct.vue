<template>
  <areal-form>
    <areal-form-input
      v-model="name"
      label="Название"
    />
    <areal-file
      v-model="FilesImages"
      label="Изображение"
    />
    <areal-form-input
      v-model="price"
      label="Цена"
      mask="#.##"
      fill-mask="0"
      reverse-fill-mask
      hint="Пример: 1.23"
    />
    <areal-form-input
      v-model="color"
      label="Цвет"
    />
    <areal-form-input
      v-model="description"
      label="Описание"
      type="textarea"
    />
    <areal-select
      v-model="section"
      label="Раздел"
    />
    <areal-checkbox
      v-model="showOnMain"
      label="Выводить на главную страницу"
    />
    <br>
    <areal-checkbox
      v-model="mainSlider"
      label="Выводить в слайдер"
    />
  </areal-form>
</template>

<script setup lang="ts">

const FilesImages = ref();
const price = ref('');
const name = ref('');
const color = ref('');
const description = ref('');
const showOnMain = ref(false);
const mainSlider = ref(false);
const section = ref();
</script>

<style scoped></style>
