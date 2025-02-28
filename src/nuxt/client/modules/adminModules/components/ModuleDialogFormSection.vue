<template>
  <areal-form>
    <areal-input v-model="name" label="Название" />
    <areal-file v-model="FilesImages" label="Изображение" />
    <areal-select v-model="parentSection" label="Родительский отдел" />
  </areal-form>
</template>

<script lang="ts">
import ArealInput from '~/modules/commonUI/runtime/components/input/ArealFormInput.vue';

export default {
  components: { ArealInput },
  setup() {
    return {
      FilesImages: ref<File | undefined>(),
      parentSection: ref(),
      name: ref(''),
    };
  },
};
</script>

<style scoped></style>
