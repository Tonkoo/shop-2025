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
    <areal-select-search
      :value="adminStore.searchName"
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
import { useAdminModule } from '~/modules/admin/global';
import { ref } from 'vue';
import type { Search } from '~/interfaces/global';
import { debounce } from 'quasar';

const adminStore = useAdminStore();
const adminModule = useAdminModule();

const name = ref(adminStore.formNameSection);
const FilesImages = ref(adminStore.formFile);
const autocompleteOptions = ref([] as Search[]);

const onSearchInput = debounce(async (value) => {
  if (value && typeof value === 'object') {
    adminStore.setSearchName(value.name);
  } else {
    adminStore.setSearchName(value);
  }
  adminStore.setFormParentSection(value);
  await adminModule.getAllNameColumn();
  autocompleteOptions.value = adminStore.allName;
}, 300);
</script>

<style scoped></style>
