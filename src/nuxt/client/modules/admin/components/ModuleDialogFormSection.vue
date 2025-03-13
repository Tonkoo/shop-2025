<template>
  <areal-form>
    <areal-form-input
      v-model="adminStore.formNameSection"
      label="Название"
      @update:model-value="adminStore.setFormNameSection"
    />
    <areal-file
      v-model="adminStore.formFile"
      label="Изображение"
      @update:model-value="adminStore.setFormFile"
    />
    <areal-select-search
      v-model="adminStore.formParentSection"
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
import type { formParentSection, Search } from '~/interfaces/global';

const adminStore = useAdminStore();
const adminModule = useAdminModule();

const autocompleteOptions = ref([] as Search[]);

const onSearchInput = async (value: any) => {
  if (value && typeof value === 'object') {
    adminStore.setSearchName(value.name);
  } else {
    adminStore.setSearchName(value);
  }
  adminStore.setFormParentSection(value);
  await adminModule.getAllNameColumn();
  autocompleteOptions.value = adminStore.allName;
};
</script>

<style scoped></style>
