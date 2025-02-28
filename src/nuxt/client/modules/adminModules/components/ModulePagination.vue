<script lang="ts">
export default {
  setup() {
    return {
      current: ref(1),
      countColumn: ref('10'),
      options: ['10', '20', '30', '40', '50'],
    }
  },
}
</script>

<template>
  <q-pagination
    v-model="current"
    color="black"
    :max="10"
    :max-pages="6"
    boundary-numbers
  />
  <q-space />
  <q-select
    v-model="countColumn"
    filled
    :options="options"
    label="На странице"
    style="width: 8%"
  />
</template>

<style scoped></style>
