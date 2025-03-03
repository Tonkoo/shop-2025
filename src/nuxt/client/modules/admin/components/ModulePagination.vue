<template>
  <areal-pagination v-model="current" />
  <q-space />
  <areal-select
    v-model="countColumn"
    :option="options"
    class="pagination__select"
    label="На странице"
  />
</template>

<script setup lang="ts">

const current = ref(1)
const countColumn = ref('10')
const options = ['10', '20', '30', '40', '50']

</script>

<style scoped>
.pagination__select {
  width: 8%;
}
</style>
