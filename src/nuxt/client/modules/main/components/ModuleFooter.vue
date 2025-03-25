<template>
  <div class="footer__wrapper">
    <div class="footer__top">
      <div class="nav nav__footer">
        <div
          v-for="parentSection in getParentSection(mainStores.itemsFooter)"
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
              v-for="childSection in getChildSection(
                mainStores.itemsFooter,
                parentSection.id
              )"
              :key="childSection.id"
            >
              <a :href="'/' + childSection.code + '/'">
                {{ childSection.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; 2025-2026 StyleHub</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainModule } from '~/modules/main/global';
import { useMainStores } from '~/modules/main/stores/mainStores';
import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';
import {
  getChildSection,
  getParentSection,
} from '~/modules/main/utils/menu.helpers.utils';

const mainModule = useMainModule();
const mainStores = useMainStores();
const quasar = useQuasar();

onMounted(async () => {
  await mainModule.getItemFooter().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});
</script>

<style scoped lang="scss">
@import '~/modules/commonUI/assets/scss/nav';
@import '~/modules/commonUI/assets/scss/nav.modifiers';

.footer__wrapper {
  display: flex;
  flex-direction: column;

  padding: 10px;

  .footer__top {
  }

  .footer__bottom {
  }
}
</style>
