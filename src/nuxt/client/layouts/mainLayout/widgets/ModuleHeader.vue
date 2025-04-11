<template>
  <div class="header">
    <div class="header__btn">
      <!--      TODO: Вынести в отдельный компонент-->
      <!--      TODO: https://gitlab.arealidea.ru/kuch-zl/site-kuchenland/nuxt/-/blob/zl-release/client/modules/commonUi/runtime/components/icons/ArealIconWrapper.vue?ref_type=heads-->
      <areal-button flat round dense @click="layoutStores.setSidebar()">
        <img
          :src="layoutStores.sidebar ? closeMenu : openMenu"
          alt="Previous"
        />
      </areal-button>
    </div>
    <div class="header__title">
      <ArealLink link="/" class="header__link">StyleHub</ArealLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStores } from '~/layouts/mainLayout/stores/layoutStores';
import openMenu from '~/modules/commonUI/assets/icon/menu/openMenu.svg';
import closeMenu from '~/modules/commonUI/assets/icon/menu/closeMenu.svg';

const layoutStores = useLayoutStores();
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
