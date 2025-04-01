<template>
  <q-layout>
    <q-header class="text-black header">
      <ModuleHeader />
    </q-header>
    <q-page-container>
      <main class="main">
        <slot />
      </main>
    </q-page-container>
    <q-footer class="footer">
      <ModuleFooter />
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import ModuleHeader from '~/modules/main/components/ModuleHeader.vue';
import ModuleFooter from '~/modules/main/components/ModuleFooter.vue';

defineOptions({ name: 'MainLayout' });
</script>

<style scoped lang="scss">
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
</style>
