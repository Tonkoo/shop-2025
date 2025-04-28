<template>
  <WgCatalogContainer v-if="layoutStores.typePage === 'section'" />
  <WgDetailPageContainer v-else />
</template>

<script setup lang="ts">
import { useCatalogModule } from '~/modules/catalog/global';
import { useLayoutStores } from '~/layouts/mainLayout/stores/layoutStores';
import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';

useHead({
  title: 'Каталог',
});

const catalogModule = useCatalogModule();
const layoutStores = useLayoutStores();

const quasar = useQuasar();
const route = useRoute();

onMounted(async () => {
  layoutStores.setPathPage(route.path);
  await catalogModule.getItemCatalog().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});
</script>

<style scoped></style>
