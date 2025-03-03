<template>
  <q-layout>
    <q-header class="bg-white text-black">
      <LayoutHeader />
    </q-header>
    <slot />
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({ name: 'AdminLayout' });

const LayoutHeader = defineAsyncComponent(
  () => import('./components/LayoutHeader.vue')
);
</script>

<style scoped lang="scss">
.main {
  .main__search-block {
    padding: 10px;
    margin: 0 20px;
    background: getColor('grey', 7);
  }
}
</style>
