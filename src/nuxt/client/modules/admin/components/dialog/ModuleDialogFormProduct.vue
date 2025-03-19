<template>
  <areal-form>
    <areal-form-input
      v-model="adminStore.frontProduct.name"
      :label="$t('admin.label.name')"
      @update:model-value="adminStore.setProductName"
    />
    <areal-file
      v-model="adminStore.frontProduct.images"
      :label="$t('admin.label.image')"
      @update:model-value="adminStore.setProductImages"
    />
    <areal-form-input
      v-model="adminStore.frontProduct.price"
      :label="$t('admin.label.price')"
      mask="#.##"
      fill-mask="0"
      reverse-fill-mask
      :hint="$t('admin.hint.price')"
      @update:model-value="adminStore.setProductPrice"
    />
    <areal-form-input
      v-model="adminStore.frontProduct.color"
      :label="$t('admin.label.color')"
      @update:model-value="adminStore.setProductColor"
    />
    <areal-form-input
      v-model="adminStore.frontProduct.description"
      :label="$t('admin.label.description')"
      type="textarea"
      @update:model-value="adminStore.setProductDescription"
    />
    <areal-select-search
      v-model="adminStore.frontProduct.section"
      :value="adminStore.searchSection"
      :option="autocompleteOptions"
      option-value="id"
      option-label="name"
      :label="$t('admin.label.section')"
      @input-value="onSearchInput"
      @update:model-value="onSearchInput"
    />
    <areal-checkbox
      v-model="adminStore.frontProduct.showOnMain"
      :label="$t('admin.label.showOnMain')"
      @update:model-value="adminStore.setProductShowOnMain"
    />
    <br />
    <areal-checkbox
      v-model="adminStore.frontProduct.mainSlider"
      :label="$t('admin.label.mainSlider')"
      @update:model-value="adminStore.setProductMainSlider"
    />
  </areal-form>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useAdminModule } from '~/modules/admin/global';
import { ref } from 'vue';
import type { Search, SelectSection } from '~/interfaces/global';

const adminStore = useAdminStore();
const adminModule = useAdminModule();

const autocompleteOptions = ref([] as Search[]);

const onSearchInput = async (value: SelectSection | string) => {
  const name = typeof value === 'string' ? value : value.name;
  adminStore.setSearchSection(name);
  if (typeof value !== 'string') {
    adminStore.setProductSection(value);
  }
  await adminModule.getAllNameColumn();
  autocompleteOptions.value = adminStore.allName;
};
</script>

<style scoped></style>
