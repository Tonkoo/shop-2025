<template>
  <areal-form>
    <areal-form-input v-model="name" label="Название" />
    <areal-file v-model="FilesImages" label="Изображение" />
    <areal-select v-model="parentSection" label="Родительский отдел" />
  </areal-form>
</template>

<script setup lang="ts">

const FilesImages = ref<File | undefined>()
const parentSection = ref()
const name = ref('')

</script>

<style scoped></style>
