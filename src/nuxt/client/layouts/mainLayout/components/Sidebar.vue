<template>
  <ArealDialog
    :model-value="dialog"
    class="sidebar"
    :position="'left'"
    :transition-show="'fade'"
    :transition-hide="'fade'"
  >
    <q-card class="sidebar__card">
      <nav class="nav nav__sidebar">
        <div
          v-for="parentSection in getParentSection(mainStores.menu)"
          :key="parentSection.id"
          class="nav__column"
        >
          <div class="nav__title">
            <NuxtLink
              :to="'/catalog/' + parentSection.code + '/'"
              @click="mainStores.setSidebar()"
            >
              {{ parentSection.name }}</NuxtLink
            >
          </div>
          <ul class="nav__list">
            <li
              v-for="childSection in getChildSection(
                mainStores.menu,
                parentSection.id,
                2
              )"
              :key="childSection.id"
            >
              <NuxtLink
                :to="
                  '/catalog/' +
                  parentSection.code +
                  '/' +
                  childSection.code +
                  '/'
                "
                @click="mainStores.setSidebar()"
              >
                {{ childSection.name }}
              </NuxtLink>
              <ul class="nav__list nav__list-nested">
                <li
                  v-for="nestedChildSection in getChildSection(
                    mainStores.menu,
                    childSection.id,
                    3
                  )"
                  :key="nestedChildSection.id"
                >
                  <NuxtLink
                    :to="
                      '/catalog/' +
                      parentSection.code +
                      '/' +
                      childSection.code +
                      '/' +
                      nestedChildSection.code +
                      '/'
                    "
                    @click="mainStores.setSidebar()"
                  >
                    {{ nestedChildSection.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </q-card>
  </ArealDialog>
</template>

<script setup lang="ts">
import { useMainStores } from '~/modules/main/stores/mainStores';
import {
  getParentSection,
  getChildSection,
} from '~/modules/main/utils/menu.helpers.utils';

const mainStores = useMainStores();

const dialog = computed(() => mainStores.sidebar);
</script>

<style scoped lang="scss">
@import '~/modules/commonUI/assets/scss/nav/nav';
@import '~/modules/commonUI/assets/scss/nav/nav.modifiers';
.sidebar {
  .sidebar__card {
    position: fixed;
    top: 64px;
    width: 300px;
    background: getColor('white', 1);
    border-radius: 0 !important;
    box-shadow: none !important;
  }
}
</style>
