<template>
  <div class="header">
    <div class="header__back">
      <ArealBreadcrumbs />
    </div>
    <div class="header__title">
      <ArealLink link="/" class="header__link">StyleHub</ArealLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  height: 64px;
  background: rgba(255, 255, 255, 0.6);
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  align-items: center;
  &__back {
    padding-left: 40px;
    grid-column: 1;
  }
  &__title {
    grid-column: 2;
    text-align: center;
  }
  &__link {
    @include font-preset('Text/22pxMedium');
    color: getColor('grey', 12);
  }
}
</style>
