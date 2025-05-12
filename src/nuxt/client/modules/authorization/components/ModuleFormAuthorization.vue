<template>
  <div class="block-authorization">
    <div class="block-authorization__header">
      <span class="block-authorization__header__title"
        >Вход в страницу администратора</span
      >
      <span class="block-authorization__header__text"
        >Только для зарегистрированых администраторов</span
      >
    </div>
    <div class="block-authorization__form">
      <ArealAuthorizationInput
        :model-value="user.username"
        placeholder="Логин"
        @update:model-value="(value) => emits('update:username', value)"
      />
      <ArealAuthorizationInput
        :model-value="user.password"
        type="password"
        placeholder="Пароль"
        @update:model-value="(value) => emits('update:password', value)"
      />
      <ArealButton
        class="block-authorization__form__btn"
        square
        label="Войти"
        @click="emits('authorization')"
      />
      <!--        @click="signIn('keycloak')"-->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/interfaces/adminGlobal';

// const { signIn, signOut, status, data } = useAuth();

const emits = defineEmits<{
  (e: 'update:username' | 'update:password', value: string): void;
  (e: 'authorization'): void;
}>();

const props = withDefaults(
  defineProps<{
    user: User;
  }>(),
  {}
);
</script>

<style scoped lang="scss">
.block-authorization {
  display: flex;
  flex-direction: column;
  gap: 24px;
  &__header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: center;
    &__title {
      @include font-preset('Text/16pxMedium');
    }
    &__text {
      @include font-preset('Text/16px');
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__btn {
      height: 56px;
      background-color: getColor('grey', 13);
      color: getColor('white', 1);
    }
  }
}
</style>
