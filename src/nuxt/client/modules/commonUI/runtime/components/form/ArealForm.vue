<template>
  <q-form class="dialog__card__form">
    <slot />
  </q-form>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dialog__card__form {
  flex: 1;
  padding: 20px 30px;
  overflow-y: auto;
}
</style>
