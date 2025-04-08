<!--TODO: Методология БЭМ-->
<template>
  <div class="footer">
    <div class="menu">
      <!--      TODO-->
      <div
        v-for="parentSection in getParentSection(mainStores.menu)"
        :key="parentSection.id"
        class="menu__column"
      >
        <div class="menu__title">
          <ArealLink :link="createLink(parentSection.code)" class="menu__link">
            {{ parentSection.name }}
          </ArealLink>
        </div>
        <ul class="menu__list">
          <li
            v-for="childSection in getChildSection(
              mainStores.menu,
              parentSection.id,
              2
            )"
            :key="childSection.id"
          >
            <ArealLink
              :link="createLink(parentSection.code, childSection.code)"
              class="menu__link"
            >
              {{ childSection.name }}
            </ArealLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <!--TODO: Автоматически определять даты-->
      <span>&copy; 2025-2026 StyleHub</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStores } from '~/modules/main/stores/mainStores';
import {
  getChildSection,
  getParentSection,
} from '~/modules/main/utils/menu.helpers.utils';
import { createLink } from '~/modules/main/utils/createLink.utils';

const mainStores = useMainStores();
</script>

<style scoped lang="scss">
//@import '~/modules/commonUI/assets/scss/nav/nav';
//@import '~/modules/commonUI/assets/scss/nav/nav.modifiers';

.footer {
  display: flex;
  flex-direction: row;
  flex-flow: row-reverse;
  justify-content: space-between;
  padding: 40px;

  .menu {
    display: flex;
    gap: 110px;
    &__column {
    }
    &__title {
    }
    &__link {
      font-size: 16px;
      text-decoration: none;
      font-weight: 400;
      line-height: 20px;
      color: getColor('white', 1);
    }
    &__list {
      list-style: none;
      padding: 0;
    }
  }
}
</style>
