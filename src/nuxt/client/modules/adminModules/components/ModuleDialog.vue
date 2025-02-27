<script lang="ts">
import { inject } from 'vue'

export default {
  setup() {
    const dialog = inject<Ref<boolean>>('dialog')
    const closeDialog = inject<() => void>('closeDialog')
    return {
      dialog,
      closeDialog,
      typeItem: ref('section'),
      name: ref(''),
      FilesImages: [],
      parentSection: ref(''),
      options: [
        { label: 'Раздел', value: 'section' },
        { label: 'Продукт', value: 'product' },
      ],
      price: ref(),
      color: ref(),
      description: ref(),
      Section: ref(),
      showOnMain: ref(),
      mainSlider: ref(),
    }
  },
}
</script>

<template>
  <q-dialog v-model="dialog" position="right" full-height>
    <q-card style="width: 600px; display: flex; flex-direction: column">
      <q-card-section class="row items-center no-wrap">
        <q-toolbar>
          <q-toolbar-title>Новая запись</q-toolbar-title>
          <q-space />
          <q-btn flat round icon="close" @click="closeDialog" />
        </q-toolbar>
      </q-card-section>

      <q-form style="flex: 1; padding: 20px 30px; overflow-y: auto">
        <q-btn-toggle
          v-model="typeItem"
          spread
          no-caps
          toggle-color="blue"
          color="white"
          text-color="black"
          :options="options"
          class="q-mb-md"
        />
        <q-input outlined v-model="name" label="Название" class="q-mb-md" />
        <q-file
          filled
          multiple
          append
          v-model="FilesImages"
          label="Изображение"
          class="q-mb-md"
        />
        <q-select
          v-if="typeItem == 'section'"
          v-model="parentSection"
          label="Родительский отдел"
          outlined
          class="q-mb-md"
        />
        <q-input
          v-if="typeItem == 'product'"
          v-model="price"
          outlined
          label="Цена"
          mask="#.##"
          fill-mask="0"
          reverse-fill-mask
          hint="Пример: 1.23"
          class="q-mb-md"
        />
        <q-input
          v-if="typeItem == 'product'"
          outlined
          v-model="color"
          label="Цвет"
          class="q-mb-md"
        />
        <q-input
          v-if="typeItem == 'product'"
          outlined
          v-model="description"
          label="Описание"
          type="textarea"
          class="q-mb-md"
        />
        <q-select
          v-if="typeItem == 'product'"
          v-model="Section"
          label="Oтдел"
          outlined
          class="q-mb-md"
        />
        <q-checkbox
          v-if="typeItem == 'product'"
          v-model="showOnMain"
          label="Выводить на главную страницу"
        />
        <br />
        <q-checkbox
          v-if="typeItem == 'product'"
          v-model="mainSlider"
          label="Выводить в слайдер"
        />
      </q-form>
      <q-card-actions align="left" style="border-top: 1px solid #ddd">
        <q-btn outline label="Добавить" />
        <q-btn outline label="Отмена" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
