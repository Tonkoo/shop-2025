<template>
  <div class="header">
    <div class="header__btn">
      <areal-button flat round dense @click="mainStores.setSidebar()">
        <img :src="mainStores.sidebar ? closeMenu : openMenu" alt="Previous" />
      </areal-button>
    </div>
    <div class="header__title">
      <ArealLink link="/" class="header__link">StyleHub</ArealLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStores } from '~/modules/main/stores/mainStores';
import openMenu from '~/modules/commonUI/assets/icon/menu/openMenu.svg';
import closeMenu from '~/modules/commonUI/assets/icon/menu/closeMenu.svg';

const mainStores = useMainStores();
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
