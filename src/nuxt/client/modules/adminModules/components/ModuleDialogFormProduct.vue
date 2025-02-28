<template>
  <areal-form>
    <areal-input v-model="name" label="Название" />
    <areal-file v-model="FilesImages" label="Изображение" />
    <areal-input
      v-model="price"
      label="Цена"
      mask="#.##"
      fill-mask="0"
      reverse-fill-mask
      hint="Пример: 1.23"
    />
    <areal-input v-model="color" label="Цвет" />
    <areal-input v-model="description" label="Описание" type="textarea" />
    <areal-select v-model="section" label="Раздел" />
    <areal-checkbox v-model="showOnMain" label="Выводить на главную страницу" />
    <br />
    <areal-checkbox v-model="mainSlider" label="Выводить в слайдер" />
  </areal-form>
</template>

<script lang="ts">
import ArealInput from '~/modules/commonUI/runtime/components/input/ArealFormInput.vue'

export default {
  components: { ArealInput },
  setup() {
    return {
      FilesImages: ref(),
      price: ref(''),
      name: ref(''),
      color: ref(''),
      description: ref(''),
      showOnMain: ref(false),
      mainSlider: ref(false),
      section: ref(),
    }
  },
}
</script>

<style scoped></style>
