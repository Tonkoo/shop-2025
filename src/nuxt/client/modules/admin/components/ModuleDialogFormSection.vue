<template>
  <areal-form>
    <areal-form-input
      v-model="name"
      label="Название"
      @update:model-value="adminStore.setFormNameSection"
    />
    <areal-file
      v-model="FilesImages"
      label="Изображение"
      @update:model-value="adminStore.setFormFile"
    />
    <areal-select-form
      v-model="parentSection"
      :option="option"
      option-label="name"
      option-value="id"
      label="Родительский отдел"
      @update:model-value="adminStore.setFormParentSection"
    />
  </areal-form>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';

const adminStore = useAdminStore();

const FilesImages = ref(adminStore.formFile);
const parentSection = ref(adminStore.formParentSection);
const name = ref(adminStore.formNameSection);

const option = adminStore.items;
</script>

<style scoped></style>
