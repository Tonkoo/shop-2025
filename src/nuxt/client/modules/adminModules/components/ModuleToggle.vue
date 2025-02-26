<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    return {
      model: ref('one'),
    }
  },
}
</script>

<template>
  <div class="q-pa-md example-row-equal-width">
    <div class="row">
      <div class="col-2">
        <q-btn-toggle
          v-model="model"
          spread
          no-caps
          class="full-height"
          toggle-color="blue"
          color="white"
          text-color="black"
          :options="[
            { label: 'Разделы', value: 'one' },
            { label: 'Продукты', value: 'two' },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
