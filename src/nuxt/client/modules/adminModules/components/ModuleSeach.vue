<script lang="ts">
export default {
  setup() {
    return {
      search: ref(),
      model: ref(),
    }
  },
}
</script>

<template>
  <q-form>
    <div class="q-pa-md example-row-equal-width">
      <div class="row">
        <div class="col-5">
          <q-select
            square
            outlined
            label="Поиск"
            :model-value="search"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            style="background: white"
          >
            <template>
              <q-item>
                <q-item-section class="text-grey"> No result </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-5">
          <q-select
            square
            outlined
            style="background: white"
            v-model="model"
            label="Тип"
          />
        </div>
        <div class="col-1">
          <q-btn
            square
            style="color: black; background: white"
            label="Поиск"
            icon="search"
            class="full-height full-width"
          />
        </div>
        <div class="col-1">
          <q-btn
            square
            style="color: black; background: white"
            label="Очистить"
            icon="close"
            class="full-height full-width"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>

<style scoped></style>
