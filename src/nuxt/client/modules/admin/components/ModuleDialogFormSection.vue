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
    <!--    <areal-select-form-->
    <!--      v-model="parentSection"-->
    <!--      :option="option"-->
    <!--      option-label="name"-->
    <!--      option-value="id"-->
    <!--      label="Родительский отдел"-->
    <!--      @update:model-value="adminStore.setFormParentSection"-->
    <!--    />-->
    <areal-select-search
      :model-value="parentSection"
      :option="autocompleteOptions"
      option-value="id"
      option-label="name"
      label="Родительский отдел"
      @input-value="onSearchInput"
      @update:model-value="onSearchInput"
    />
  </areal-form>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { ref } from 'vue';
import type { Search } from '~/interfaces/global';
import { debounce } from 'quasar';

const adminStore = useAdminStore();

const name = ref(adminStore.formNameSection);
const FilesImages = ref(adminStore.formFile);
const parentSection = ref({ name: '' });
const autocompleteOptions = ref([] as Search[]);

const onSearchInput = debounce(async (value) => {
  if (value && typeof value === 'object') {
    adminStore.setSearchName(value.name);
  } else {
    adminStore.setSearchName(value);
  }
  adminStore.setFormParentSection(value);
  await adminStore.getNameItems();
  autocompleteOptions.value = adminStore.allName;
}, 300);
</script>

<style scoped></style>
