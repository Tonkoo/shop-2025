<template>
  <q-form>
    <div class="q-pa-md example-row-equal-width">
      <div class="row">
        <div class="col-5">
          <areal-select-search
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :model-value="search"
            :options="filteredOptions"
            option-value="name"
            option-label="name"
            label="Поиск"
            @update:model-value="adminStore.setSearchName"
            @filter="filterOptions"
          />
        </div>
        <div class="col-5">
          <areal-select-type-search
            v-model="typeSearch"
            label="Тип"
            :options="optionsTip"
            option-value="value"
            option-label="label"
            @update:model-value="adminStore.setTypeSearch"
          />
        </div>
        <div class="col-1">
          <areal-button
            label="Поиск"
            icon="search"
            class="full-height full-width"
            @click="SerachTable"
          />
        </div>
        <div class="col-1">
          <areal-button
            label="Очистить"
            icon="close"
            class="full-height full-width"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { ref } from 'vue';
import type { Search } from '~/interfaces/global';

const adminStore = useAdminStore();

const optionsTip = [
  { label: 'Разделы', value: 'section' },
  { label: 'Продукты', value: 'product' },
];

const optionsName = ref<Search[]>([]);
const filteredOptions = ref<Search[]>([]);

watch(
  () => adminStore.allName,
  (newValue) => {
    optionsName.value = newValue;
    filteredOptions.value = newValue;
  },
  { immediate: true }
);

const search = ref(adminStore.searchName);
const typeSearch = ref(adminStore.typeSearch);

const filterOptions = (val: string) => {
  const needle = val.toLowerCase();
  if (needle.length >= 3) {
    filteredOptions.value = optionsName.value
      .filter((option: Search) => option.name.toLowerCase().includes(needle))
      .slice(0, 5);
  } else {
    filteredOptions.value = optionsName.value;
  }
};

async function SerachTable() {
  try {
    await adminStore.getItems();
  } catch (err) {
    console.error('Error when receiving "Sections" data from the server:', err);
  }
}
</script>

<style scoped></style>
