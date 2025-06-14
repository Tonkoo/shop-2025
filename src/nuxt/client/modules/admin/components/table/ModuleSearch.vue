<template>
  <div>
    <div class="q-pa-md example-row-equal-width">
      <div class="row">
        <div
          :class="adminStore.typeSearch.value === 'product' ? 'col-2' : 'col-5'"
        >
          <areal-select-type-search
            v-model="adminStore.typeSearch"
            :label="$t('admin.label.type')"
            :options="optionsTip"
            option-value="value"
            option-label="label"
            @update:model-value="adminStore.setTypeSearch"
          />
        </div>
        <div v-if="adminStore.typeSearch.value === 'product'" class="col-4">
          <areal-select-filter
            v-model="adminStore.filterSection"
            :label="$t('admin.label.optionSection')"
            :option="filterOptions"
            option-value="name"
            option-label="name"
            @update:model-value="adminStore.setFilterSection"
            @focus="getNameFilter()"
          />
        </div>
        <div
          :class="adminStore.typeSearch.value === 'product' ? 'col-4' : 'col-5'"
        >
          <areal-select-search
            v-model="adminStore.searchName"
            :option="autocompleteOptions"
            option-value="name"
            option-label="name"
            :label="$t('admin.label.search')"
            @input-value="onSearchInput"
            @update:model-value="onSearchInput"
            @focus="onSearchInput(adminStore.searchName)"
          />
        </div>
        <div class="col-1">
          <areal-button
            :label="$t('admin.label.search')"
            icon="search"
            class="full-height full-width"
            @click="adminModule.getItems()"
          />
        </div>
        <div class="col-1">
          <areal-button
            :label="$t('admin.label.clear')"
            icon="close"
            class="full-height full-width"
            @click="clearSearch"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useAdminModule } from '~/modules/admin/global';
import { ref } from 'vue';
import type { Search } from '~/interfaces/adminGlobal';
import type { AxiosError } from 'axios';
import { notifyNegative } from '~/entities/notify.entites';
import { useQuasar } from 'quasar';

const adminStore = useAdminStore();
const adminModule = useAdminModule();
const quasar = useQuasar();

const autocompleteOptions = ref([] as Search[]);
const filterOptions = ref([] as Search[]);

const onSearchInput = async (value: string | { name: string }) => {
  const name = typeof value === 'string' ? value : value.name;

  adminStore.setSearchName(name);
  await adminModule
    .getAllNameColumn(adminStore.typeSearch.value)
    .catch((err: AxiosError) => {
      quasar.notify({
        ...notifyNegative,
        message: err.message,
      });
    });
  autocompleteOptions.value = adminStore.allName;
};

const optionsTip = [
  { label: 'Разделы', value: 'section' },
  { label: 'Продукты', value: 'product' },
];

async function clearSearch() {
  try {
    adminStore.setTypeSearch({ label: 'Разделы', value: 'section' });
    adminStore.setSearchName('');
    adminStore.setFilterSection(null);
    await adminModule.getItems();
  } catch (err) {
    console.error('Error when receiving "Sections" data from the server:', err);
  }
}

async function getNameFilter() {
  try {
    await adminModule.getAllNameColumn('section');
    filterOptions.value = adminStore.itemsFilter;
  } catch (err) {
    console.error(err);
  }
}
</script>

<style scoped></style>
