<template>
  <areal-form>
    <areal-form-input
      v-model="adminStore.frontSection.name"
      :label="$t('admin.label.name')"
      :errors-message="adminStore.errors.name"
      @update:model-value="adminStore.setSectionName"
    />
    <areal-file
      v-model="adminStore.frontSection.images"
      :label="$t('admin.label.image')"
      @update:model-value="adminStore.setSectionImages"
    />
    <areal-block-images :images-array="adminStore.frontSection.images" />
    <areal-select-form
      v-model="adminStore.sectionForm"
      :option="autocompleteOptions"
      option-value="id"
      option-label="name"
      :label="$t('admin.label.parentSection')"
      @input-value="onSearchInput"
      @update:model-value="onSearchInput"
      @focus="onSearchInput(adminStore.sectionForm.name)"
    />
  </areal-form>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useAdminModule } from '~/modules/admin/global';
import { ref } from 'vue';
import type { SelectSection, Search } from '~/interfaces/adminGlobal';

const adminStore = useAdminStore();
const adminModule = useAdminModule();

const autocompleteOptions = ref([] as Search[]);

const onSearchInput = async (value: SelectSection | string) => {
  const name = typeof value === 'string' ? value : value.name;
  adminStore.setSearchParentName(name);
  if (typeof value !== 'string') {
    adminStore.setSectionIdParent(value.id);
  }
  await adminModule.getAllNameColumn('section', adminStore.typeItem);
  autocompleteOptions.value = adminStore.allName;
};
</script>

<style scoped lang="scss"></style>
