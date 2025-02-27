<template>
  <areal-form>
    <ArealFormInput v-model="name" label="Название" />
    <q-file
      v-model="FilesImages"
      filled
      multiple
      use-chips
      append
      label="Изображение"
      class="q-mb-md"
    />
    <q-select
      v-model="parentSection"
      label="Родительский отдел"
      outlined
      class="q-mb-md"
    />
  </areal-form>
</template>

<script lang="ts">
export default {
  setup() {
    return {
      FilesImages: ref(),
      parentSection: ref(),
      name: ref(),
    }
  },
}
</script>

<style scoped></style>
