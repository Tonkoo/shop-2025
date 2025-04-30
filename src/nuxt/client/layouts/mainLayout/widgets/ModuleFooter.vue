<template>
  <div class="footer">
    <div class="footer__menu menu">
      <div
        v-for="parentSection in menu"
        :key="parentSection.id"
        class="footer__menu__column"
      >
        <div class="footer__menu__title menu__title">
          <ArealLink
            :link="parentSection.url"
            class="footer__menu__link menu__link"
          >
            {{ parentSection.name }}
          </ArealLink>
        </div>
        <ul class="footer__menu__list menu__list">
          <li
            v-for="childSection in parentSection.items"
            :key="childSection.id"
          >
            <ArealLink
              :link="childSection.url"
              class="footer__menu__link menu__link"
            >
              {{ childSection.name }}
            </ArealLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__copyright">
      <span class="footer__copyright__text"
        >&copy; {{ getYearCopyright() }} StyleHub</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SectionMain } from '~/interfaces/mainGlobal';

defineProps({
  menu: {
    type: Array as PropType<SectionMain[]>,
    required: true,
  },
});

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

  &__menu {
    gap: 110px;
    &__list {
      gap: 16px;
      margin-top: 24px;
    }
    &__link {
      color: getColor('white', 1);
    }
  }

  &__copyright {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &__text {
      color: getColor('white', 1);
    }
  }
}
</style>
