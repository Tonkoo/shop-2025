<template>
  <areal-form>
    <areal-form-input
      v-model="adminStore.frontSection.name"
      :label="$t('admin.label.name')"
      :errors="adminStore.errors.name"
      @update:model-value="adminStore.setSectionName"
    />
    <areal-file
      v-model="adminStore.frontSection.images"
      :label="$t('admin.label.image')"
      @update:model-value="adminStore.setSectionImages"
    />
    <areal-select-search
      v-model="adminStore.frontSection.parent"
      :value="adminStore.searchParentName"
      :option="autocompleteOptions"
      option-value="id"
      option-label="name"
      :label="$t('admin.label.parentSection')"
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

const onSearchInput = async (value: ParentSection | string) => {
  const name = typeof value === 'string' ? value : value.name;
  adminStore.setSearchParentName(name);
  if (typeof value !== 'string') {
    adminStore.setSectionIdParent(value);
  }
  await adminModule.getAllNameColumn();
  autocompleteOptions.value = adminStore.allName;
};
</script>

<style scoped></style>
