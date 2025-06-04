<template>
  <q-img :src="urlImage" :alt="alt" class="img" />
</template>

<script setup lang="ts">
import defaultSVG from '~/modules/commonUI/assets/icon/default.svg';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
});

const urlImage = computed(() => {
  if (!props.src) {
    return defaultSVG;
  }
  console.log(new URL(props.src, 'http://localhost').toString());
  return new URL(props.src, 'http://localhost').toString();
});
</script>

<style scoped lang="scss">
.img {
  width: 100%;
  height: 100%;
}
</style>
