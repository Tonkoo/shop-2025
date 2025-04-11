<template>
  <div class="main-layout">
    <header class="header">
      <ModuleHeader />
    </header>
    <main class="main-layout__container">
      <slot />
    </main>
    <footer class="footer">
      <ModuleFooter />
    </footer>
    <Sidebar />
  </div>
</template>

<script setup lang="ts">
import ModuleHeader from '~/layouts/mainLayout/widgets/ModuleHeader.vue';
import ModuleFooter from '~/layouts/mainLayout/widgets/ModuleFooter.vue';
import Sidebar from '~/layouts/mainLayout/components/Sidebar.vue';

defineOptions({ name: 'MainLayout' });
</script>

<style lang="scss">
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  &__container {
    display: flex;
    flex-direction: column;
    gap: 72px;
    padding-top: 32px;
    flex-grow: 1;
    margin-bottom: 42px;
  }
  .header {
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
