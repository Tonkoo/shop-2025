<template>
  <q-layout>
    <slot />
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({ name: 'AdminLayout' });
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
