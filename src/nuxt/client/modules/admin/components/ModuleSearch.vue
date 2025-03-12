<template>
  <q-form>
    <div class="q-pa-md example-row-equal-width">
      <div class="row">
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
        <div class="col-5">
          <areal-select-search
            :value="adminStore.searchName"
            :option="autocompleteOptions"
            option-value="name"
            option-label="name"
            label="Поиск"
            @input-value="onSearchInput"
            @update:model-value="onSearchInput"
          />
        </div>
        <div class="col-1">
          <!--          -->
          <areal-button
            label="Поиск"
            icon="search"
            class="full-height full-width"
            @click="adminModule.getItems()"
          />
        </div>
        <div class="col-1">
          <areal-button
            label="Очистить"
            icon="close"
            class="full-height full-width"
            @click="ClearSearch"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useAdminModule } from '~/modules/admin/global';
import { ref } from 'vue';
import { debounce } from 'quasar';
import type { Search } from '~/interfaces/global';

const adminStore = useAdminStore();
const adminModule = useAdminModule();

const autocompleteOptions = ref([] as Search[]);

const onSearchInput = debounce(async (value) => {
  adminStore.setSearchName(value?.name || value);
  await adminModule.getAllNameColumn();
  autocompleteOptions.value = adminStore.allName;
}, 300);

const optionsTip = [
  { label: 'Разделы', value: 'section' },
  { label: 'Продукты', value: 'product' },
];

let typeSearch = ref(adminStore.typeSearch);

async function ClearSearch() {
  try {
    adminStore.setTypeSearch({ label: 'Разделы', value: 'section' });
    typeSearch = ref(adminStore.typeSearch);
    adminStore.setSearchName('');
    await adminModule.getItems();
  } catch (err) {
    console.error('Error when receiving "Sections" data from the server:', err);
  }
}
</script>

<style scoped></style>
