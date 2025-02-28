<template>
  <q-card-section class="row items-center no-wrap">
    <q-toolbar>
      <q-toolbar-title>Новая запись</q-toolbar-title>
      <q-space />
      <q-btn flat round icon="close" @click="closeDialog" />
    </q-toolbar>
  </q-card-section>
  <areal-btn-toggle v-model="typeItem" :options="options" class="q-mb-md" />
</template>

<script lang="ts">
import { inject, provide, ref } from 'vue'

export default {
  setup() {
    const closeDialog = inject<() => void>('closeDialog')
    const typeItem = useState('typeItem', () => 'section')
    // provide('typeItem', typeItem)
    return {
      closeDialog,
      options: [
        { label: 'Раздел', value: 'section' },
        { label: 'Продукт', value: 'product' },
      ],
      typeItem,
    }
  },
}
</script>

<style scoped></style>
