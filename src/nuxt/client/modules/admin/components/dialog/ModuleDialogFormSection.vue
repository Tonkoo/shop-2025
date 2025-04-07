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
    <areal-block-images :images-array="adminStore.frontSection.images" />
    <!--    <div-->
    <!--      v-if="adminStore.frontSection.images.length"-->
    <!--      class="image-container q-mb-md"-->
    <!--    >-->
    <!--      <div-->
    <!--        v-for="(images, index) in adminStore.frontSection.images"-->
    <!--        :key="index"-->
    <!--      >-->
    <!--        <q-img :src="getUrlFile(images)" class="image-container__image" />-->
    <!--      </div>-->
    <!--    </div>-->
    <areal-select-form
      v-model="adminStore.frontSection.parent"
      :option="autocompleteOptions"
      option-value="id"
      option-label="name"
      :label="$t('admin.label.parentSection')"
      @input-value="onSearchInput"
      @update:model-value="onSearchInput"
      @focus="onSearchInput"
    />
  </areal-form>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useAdminModule } from '~/modules/admin/global';
import { ref } from 'vue';
import type { SelectSection, Search } from '~/interfaces/global';

const adminStore = useAdminStore();
const adminModule = useAdminModule();

const autocompleteOptions = ref([] as Search[]);

const onSearchInput = async (value: SelectSection | string) => {
  const name = typeof value === 'string' ? value : value.name;
  adminStore.setSearchParentName(name);
  if (typeof value !== 'string') {
    adminStore.setSectionIdParent(value);
  }
  await adminModule.getAllNameColumn('section', adminStore.typeItem);
  autocompleteOptions.value = adminStore.allName;
};

// const getUrlFile = (image: File) => {
//   if (image instanceof File) {
//     return URL.createObjectURL(image);
//   }
//   return image;
// };
</script>

<style scoped lang="scss">
//.image-container {
//  display: grid;
//  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
//  height: auto;
//  width: 100%;
//  border-radius: 10px;
//  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
//  gap: 10px;
//  padding: 10px;
//  //max-height: 500px;
//  //overflow-y: auto;
//  //overflow-x: hidden;
//
//  &__image {
//    transition: all 0.3s ease;
//
//    &:hover {
//      transform: scale(1.3);
//      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
//    }
//  }
//}
</style>
