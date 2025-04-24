<template>
  <div class="header">
    <div class="header__btn">
      <areal-button flat round dense @click="emit('set-sidebar')">
        <areal-svg :icon-name="sidebar ? 'closeMenu' : 'openMenu'" />
      </areal-button>
    </div>
    <div class="header__title">
      <ArealLink link="/" class="header__link">StyleHub</ArealLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  sidebar: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['set-sidebar']);
</script>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: 34px 1fr 34px;
  align-items: center;
  &__btn {
    padding-left: 40px;
    grid-column: 1;
  }
  &__title {
    grid-column: 2;
    text-align: center;
  }
  &__link {
    font-size: 20px;
    color: getColor('grey', 12);
  }
}
</style>
