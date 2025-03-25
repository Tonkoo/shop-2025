<template>
  <ArealDialog :model-value="dialog" class="sidebar" :position="'left'">
    <q-card class="sidebar__card">
      <div class="nav nav__sidebar">
        <div
          v-for="parentSection in getParentSection()"
          :key="parentSection.id"
          class="nav__column"
        >
          <div class="nav__title">
            <a :href="'/' + parentSection.code + '/'">{{
              parentSection.name
            }}</a>
          </div>
          <ul class="nav__list">
            <li
              v-for="childSection in getChildSection(parentSection.id)"
              :key="childSection.id"
            >
              <a :href="'/' + childSection.code + '/'">
                {{ childSection.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </q-card>
  </ArealDialog>
</template>

<script setup lang="ts">
import { useMainStores } from '~/modules/main/stores/mainStores';
import { useMainModule } from '~/modules/main/global';
import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';

const mainStores = useMainStores();
const mainModule = useMainModule();
const quasar = useQuasar();

const dialog = computed(() => mainStores.sidebar);

onMounted(async () => {
  await mainModule.getSectionMenu().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});

function getParentSection() {
  return mainStores.menuSection.filter((section) => section.level === 1);
}

function getChildSection(parentId: number) {
  return mainStores.menuSection.filter(
    (section) => section.level === 2 && section.idParent === parentId
  );
}
</script>

<style scoped lang="scss">
@import '~/modules/commonUI/assets/scss/nav';
@import '~/modules/commonUI/assets/scss/nav.modifiers';
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
