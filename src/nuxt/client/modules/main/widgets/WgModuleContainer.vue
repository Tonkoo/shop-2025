<template>
  <Swiper />
  <Sidebar />
</template>

<script setup lang="ts">
import Sidebar from '~/modules/main/components/Sidebar.vue';
import Swiper from '~/modules/main/components/Swiper.vue';
</script>

<style lang="scss">
.sidebar .q-dialog__backdrop {
  top: 64px !important;
}
</style>
