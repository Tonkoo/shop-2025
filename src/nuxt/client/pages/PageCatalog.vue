<!--TODO: написать виджет для детальной страницы и вызывать его в зависимости от типа, пришедшего с бэкенда. -->
<template>
  <WgCatalogContainer />
</template>

<script setup lang="ts">
import { useCatalogModule } from '~/modules/catalog/global';

import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';

const catalogModule = useCatalogModule();
const quasar = useQuasar();

onMounted(async () => {
  await catalogModule.getItemCatalog().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});
</script>

<style scoped></style>
