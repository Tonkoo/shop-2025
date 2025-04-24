<template>
  <div class="breadcrumbs">
    <div class="breadcrumbs__link" @click="router.back()">
      <ArealSvg icon-name="goBack" size="S" />
      <span class="breadcrumbs__text">Назад</span>
    </div>
    <div v-if="title" class="breadcrumbs__border" />
    <span v-if="title" class="breadcrumbs__text">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 12px;
  &__link {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: getColor('grey', 13);
    }
  }
  &__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
  }
  &__border {
    width: 1px;
    height: 17px;
    background-color: getColor('black', 1);
  }
}
</style>
