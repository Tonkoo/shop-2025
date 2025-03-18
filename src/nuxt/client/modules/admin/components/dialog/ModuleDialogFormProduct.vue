<template>
  <areal-form>
    <areal-form-input v-model="name" :label="$t('admin.label.name')" />
    <areal-file v-model="FilesImages" :label="$t('admin.label.image')" />
    <areal-form-input
      v-model="price"
      :label="$t('admin.label.price')"
      mask="#.##"
      fill-mask="0"
      reverse-fill-mask
      :hint="$t('admin.hint.price')"
    />
    <areal-form-input v-model="color" :label="$t('admin.label.color')" />
    <areal-form-input
      v-model="description"
      :label="$t('admin.label.description')"
      type="textarea"
    />
    <areal-select v-model="section" :label="$t('admin.label.section')" />
    <areal-checkbox
      v-model="showOnMain"
      :label="$t('admin.label.showOnMain')"
    />
    <br />
    <areal-checkbox
      v-model="mainSlider"
      :label="$t('admin.label.mainSlider')"
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
