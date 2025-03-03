<template>
  <areal-form>
    <areal-input v-model="name" label="Название" />
    <areal-file v-model="FilesImages" label="Изображение" />
    <areal-select v-model="parentSection" label="Родительский отдел" />
  </areal-form>
</template>

<script setup lang="ts">
import ArealInput from '~/modules/commonUI/runtime/components/input/ArealFormInput.vue';

const FilesImages = ref<File | undefined>()
const parentSection = ref()
const name = ref('')

</script>

<style scoped></style>
