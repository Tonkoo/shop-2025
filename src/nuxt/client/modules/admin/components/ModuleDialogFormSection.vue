<template>
  <areal-form>
    <areal-form-input
      v-model="adminStore.section.name"
      label="Название"
      @update:model-value="adminStore.setSectionName"
    />
    <areal-file
      v-model="adminStore.section.images"
      label="Изображение"
      @update:model-value="adminStore.setSectionImages"
    />
    <areal-select-search
      v-model="adminStore.section.parent"
      :value="adminStore.searchParentName"
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
import type { ParentSection, Search } from '~/interfaces/global';

const adminStore = useAdminStore();
const adminModule = useAdminModule();

const autocompleteOptions = ref([] as Search[]);

const onSearchInput = async (value: any) => {
  if (value && typeof value === 'object') {
    adminStore.setSearchParentName(value.name);
  } else {
    adminStore.setSearchParentName(value);
  }
  adminStore.setSectionIdParent(value);
  await adminModule.getAllNameColumn();
  autocompleteOptions.value = adminStore.allName;
};
</script>

<style scoped></style>
