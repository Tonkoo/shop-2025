<template>
  <ArealDialog
    :model-value="dialog"
    class="sidebar"
    :position="'left'"
    :transition-show="'fade'"
    :transition-hide="'fade'"
  >
    <div class="card">
      <nav class="menu">
        <div
          v-for="parentSection in menu"
          :key="parentSection.id"
          class="menu__column"
        >
          <div class="menu__title">
            <ArealLink
              :link="parentSection.url"
              class="menu__link menu__link_title"
              @click="emit('set-sidebar')"
              >{{ parentSection.name }}</ArealLink
            >
          </div>
          <ul class="menu__list">
            <li
              v-for="childSection in parentSection.items"
              :key="childSection.id"
            >
              <ArealLink
                :link="childSection.url"
                class="menu__link"
                @click="emit('set-sidebar')"
              >
                {{ childSection.name }}
              </ArealLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </ArealDialog>
</template>

<script setup lang="ts">
import type { SectionMain } from '~/interfaces/mainGlobal';

defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  menu: {
    type: Array as PropType<SectionMain[]>,
    required: true,
  },
});

const emit = defineEmits(['set-sidebar']);
</script>

<style scoped lang="scss">
@import '~/modules/commonUI/assets/scss/menu/menu';

.sidebar {
  .card {
    position: fixed;
    top: 64px;
    width: 300px;
    background: getColor('white', 1);
    border-radius: 0;
    box-shadow: none;
    padding: 40px;
    .menu {
      flex-direction: column;
      gap: 20px;
      &__list {
        gap: 8px;
      }
      &__link {
        color: getColor('grey', 12);
        &_title {
          font-weight: 500;
        }
      }
    }
  }
}
</style>
