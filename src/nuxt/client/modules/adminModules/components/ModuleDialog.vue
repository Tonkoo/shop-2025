<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const dialog = ref(false)
    const position = ref('top')

    return {
      dialog,
      position,

      open() {
        dialog.value = true
      },
    }
  },
}
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      label="Right"
      icon="keyboard_arrow_right"
      color="primary"
      @click="open()"
    />

    <q-dialog v-model="dialog" position="right" full-height>
      <q-card style="width: 500px">
        <q-card-section class="row items-center no-wrap">
          <q-toolbar>
            <q-toolbar-title>Новая запись</q-toolbar-title>
            <q-space />
            <q-btn flat round icon="close" />
          </q-toolbar>
        </q-card-section>
        <q-form style="padding: 10px">
          <q-input model-value="text" />
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped></style>
