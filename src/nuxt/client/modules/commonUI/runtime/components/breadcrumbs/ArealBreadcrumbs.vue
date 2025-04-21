<template>
  <div class="breadcrumbs">
    <ArealSvg icon-name="goBack" size="S" />
    <span class="breadcrumbs__text">Назад</span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 4px;
  &__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
  }
}
</style>
