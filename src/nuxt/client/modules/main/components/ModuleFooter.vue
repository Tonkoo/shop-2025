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
    <div class="copyright">
      <span class="copyright__text"
        >&copy; {{ new Date().getFullYear() }} --
        {{ new Date().getFullYear() + 1 }} StyleHub</span
      >
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
      text-transform: uppercase;
    }
    &__link {
      font-size: 16px;
      text-decoration: none;
      font-weight: 400;
      line-height: 20px;
      color: getColor('white', 1);
      background: linear-gradient(currentColor, currentColor) no-repeat 0 100%;
      background-size: 0 1px;
      transition: background-size 0.3s;

      &:hover {
        background-size: 100% 1px;
      }
    }
    &__list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 24px;
      list-style: none;
      padding: 0;
    }
  }

  .copyright {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &__text {
      color: getColor('white', 1);
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
    }
  }
}
</style>
