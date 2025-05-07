<template>
  <div class="authorization-layout">
    <header class="header">
      <ModuleHeader />
    </header>
    <main class="authorization-layout__container">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import ModuleHeader from '~/layouts/authorizationLayout/widgets/ModuleHeader.vue';
</script>

<style scoped lang="scss">
.authorization-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 72px;
    padding-top: 32px;
    flex-grow: 1;
    margin-bottom: 42px;
  }
}
</style>
