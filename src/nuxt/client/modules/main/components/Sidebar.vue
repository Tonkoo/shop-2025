<template>
  <ArealDialog :model-value="dialog" class="sidebar" :position="'left'">
    <q-card class="sidebar__card"> </q-card>
  </ArealDialog>
</template>

<script setup lang="ts">
import { useMainStores } from '~/modules/main/stores/mainStores';
import { useMainModule } from '~/modules/main/global';
import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';

const mainStores = useMainStores();
const mainModule = useMainModule();
const quasar = useQuasar();

const dialog = computed(() => mainStores.sidebar);

onMounted(async () => {
  await mainModule.getSectionMenu().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});
</script>

<style scoped lang="scss">
.sidebar {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .sidebar__card {
    position: fixed;
    top: 64px;
    width: 300px;
    background: getColor('white', 1);
    border-radius: 0 !important;
    box-shadow: none !important;
  }
}
</style>
