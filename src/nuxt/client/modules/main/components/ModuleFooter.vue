<template>
  <div class="footer__wrapper">
    <div class="footer__top">
      <div class="footer-nav">
        <div
          v-for="parentSection in getParentSection()"
          :key="parentSection.id"
          class="footer-nav__column"
        >
          <div class="footer-nav__title">
            <a :href="'/' + parentSection.code + '/'">{{
              parentSection.name
            }}</a>
          </div>
          <ul class="footer-nav__list">
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

function getParentSection() {
  return mainStores.itemsFooter.filter((section) => section.level === 1);
}

function getChildSection(parentId: number) {
  return mainStores.itemsFooter.filter(
    (section) => section.level === 2 && section.idParent === parentId
  );
}
</script>

<style scoped lang="scss">
.footer__wrapper {
  display: flex;
  flex-direction: column;

  padding: 10px;

  .footer__top {
    .footer-nav {
      display: flex;
      justify-content: center;
      gap: 50px;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      .footer-nav__column {
        .footer-nav__title {
          text-transform: uppercase;
          font-weight: bold;
        }
        .footer-nav__list {
          display: flex;
          flex-direction: column;
          list-style: none;
          gap: 10px;
          padding: 0;
        }
        a {
          position: relative;
          text-decoration: none;
          color: getColor('white', 1);
          transition: color 0.3s ease;

          &:hover {
            color: getColor('grey', 6);

            &::after {
              width: 100%;
              opacity: 1;
            }
          }
          &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background: getColor('white', 1);
            transition:
              width 0.5s ease,
              opacity 0.5s ease;
            opacity: 0;
          }
        }
      }
    }
  }

  .footer__bottom {
  }
}
</style>
