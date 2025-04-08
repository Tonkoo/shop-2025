<!--TODO: Вынести ModuleHeader ModuleFooter в mainLayout -> widgets-->

<!--TODO не использовать quasar элементы, а использовать div, избавиться от !important. Методология БЭМ-->

<template>
  <q-layout class="main-layout">
    <q-header class="text-black header">
      <ModuleHeader />
    </q-header>
    <q-page-container class="main-layout__container">
      <main class="main">
        <slot />
      </main>
    </q-page-container>
    <q-footer class="footer">
      <ModuleFooter />
    </q-footer>
    <!--TODO: Вынести areal-sidebar в mainLayout -> components-->
    <areal-sidebar />
  </q-layout>
</template>

<script setup lang="ts">
import ModuleHeader from '~/modules/main/components/ModuleHeader.vue';
import ModuleFooter from '~/modules/main/components/ModuleFooter.vue';
import { useMainModule } from '~/modules/main/global';
import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';

defineOptions({ name: 'MainLayout' });

const mainModule = useMainModule();
const quasar = useQuasar();

onMounted(async () => {
  await mainModule.getItems().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});
</script>

<style lang="scss">
.main-layout {
  &__container {
    padding-top: 32px;
  }
  //.sidebar .q-dialog__backdrop {
  //  top: 64px !important;
  //}
  .header {
    position: sticky;
    top: 0;
    z-index: 2000;
    height: 64px;
    background: rgba(255, 255, 255, 0.6);
  }
  .footer {
    background: getColor('grey', 12);
  }
}
.sidebar .q-dialog__backdrop {
  top: 64px !important;
}
</style>
