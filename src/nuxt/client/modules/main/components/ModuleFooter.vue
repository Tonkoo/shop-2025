<template>
  <div class="footer__wrapper">
    <div class="footer__top">
      <div class="footer-nav">
        <div class="footer-nav__column">
          <div class="footer-nav__title">Пункт 1</div>
          <ul class="footer-nav__list">
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; 2025-2026 StyleHub</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
      .footer-nav__column {
        .footer-nav__title {
          font-weight: bold;
        }
        .footer-nav__list {
          display: flex;
          flex-direction: column;
          list-style: none;
          padding: 0;
          margin: 10px;
          gap: 10px;
        }
      }
    }
  }

  .footer__bottom {
  }
}
</style>
