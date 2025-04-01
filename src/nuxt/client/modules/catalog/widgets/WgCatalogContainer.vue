<template>
  <!--  <div class="q-pa-md q-gutter-sm">-->
  <!--    <q-breadcrumbs separator="|" active-color="black">-->
  <!--      <q-breadcrumbs-el-->
  <!--        label="Назад"-->
  <!--        icon="arrow_back_ios"-->
  <!--        @click="router.back()"-->
  <!--      />-->
  <!--      <q-breadcrumbs-el label="12312" />-->
  <!--    </q-breadcrumbs>-->
  <!--  </div>-->
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const route = useRoute();
onMounted(() => {
  console.log(route.params);
});
</script>

<style lang="scss"></style>
