<template>
  <q-btn :label="label" class="button" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArealButton',
  props: {
    label: {
      type: String,
      default: 'Название',
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped lang="scss">
.button {
  color: getColor('black', 1);
  background: getColor('white', 1);
}
</style>
