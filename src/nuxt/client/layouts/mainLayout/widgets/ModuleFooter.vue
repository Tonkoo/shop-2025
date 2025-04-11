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
          <ArealLink :link="parentSection.url" class="menu__link">
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
            <ArealLink :link="childSection.url" class="menu__link">
              {{ childSection.name }}
            </ArealLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <span class="copyright__text"
        >&copy; {{ getYearCopyright() }} StyleHub</span
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

const mainStores = useMainStores();

const getYearCopyright = () => {
  const year = new Date().getFullYear();
  return `${year} -- ${year + 1}`;
};
</script>

<style scoped lang="scss">
@import '~/modules/commonUI/assets/scss/menu/menu';

.footer {
  display: flex;
  flex-direction: row;
  flex-flow: row-reverse;
  justify-content: space-between;
  padding: 40px;

  .menu {
    gap: 110px;
    &__column {
    }
    &__title {
    }
    &__list {
      gap: 16px;
      margin-top: 24px;
    }
    &__link {
      color: getColor('white', 1);
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
