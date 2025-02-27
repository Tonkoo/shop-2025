<template>
  <ArealDialog :model-value="dialog">
    <q-card class="dialog__card">
      <q-card-section class="row items-center no-wrap">
        <q-toolbar>
          <q-toolbar-title>Новая запись</q-toolbar-title>
          <q-space />
          <q-btn flat round icon="close" @click="closeDialog" />
        </q-toolbar>
      </q-card-section>
      <areal-form>
        <ArealBtnToggle v-model="typeItem" :options="options" class="q-mb-md" />
        <ArealFormInput v-model="name" label="Название" />
        <q-file
          v-model="FilesImages"
          filled
          multiple
          use-chips
          append
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
        <ArealFormInput
          v-if="typeItem == 'product'"
          v-model="price"
          label="Цена"
          mask="#.##"
          fill-mask="0"
          reverse-fill-mask
          hint="Пример: 1.23"
        />
        <ArealFormInput
          v-if="typeItem == 'product'"
          v-model="color"
          label="Цвет"
        />
        <ArealFormInput
          v-if="typeItem == 'product'"
          v-model="description"
          label="Описание"
          type="textarea"
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
          color="black"
          label="Выводить на главную страницу"
        />
        <br />
        <q-checkbox
          v-if="typeItem == 'product'"
          v-model="mainSlider"
          color="black"
          label="Выводить в слайдер"
        />
      </areal-form>
      <q-card-actions align="left" style="border-top: 1px solid #ddd">
        <q-btn color="black" label="Добавить" />
        <q-btn outline label="Отмена" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </ArealDialog>
</template>

<script lang="ts">
import { inject } from 'vue'
import ArealFormInput from '~/modules/commonUI/runtime/components/inputs/ArealFormInput.vue'
import ArealBtnToggle from '~/modules/commonUI/runtime/components/toggle/ArealBtnToggle.vue'
import ArealForm from '~/modules/commonUI/runtime/components/form/ArealForm.vue'
import ArealDialog from '~/modules/commonUI/runtime/components/dialog/ArealDialog.vue'

export default {
  components: {
    ArealFormInput,
    ArealBtnToggle,
    ArealForm,
    ArealDialog,
  },
  setup() {
    const dialog = inject<Ref<boolean>>('dialog', ref(false))
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
      showOnMain: ref(false),
      mainSlider: ref(false),
    }
  },
}
</script>

<style scoped>
.dialog {
  .dialog__card {
    width: 600px;
    display: flex;
    flex-direction: column;
  }
}
</style>
