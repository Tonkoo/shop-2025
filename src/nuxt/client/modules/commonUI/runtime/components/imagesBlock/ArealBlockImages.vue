<template>
  <div v-if="imagesArray.length" class="image-container q-mb-md">
    <div v-for="(images, index) in imagesArray" :key="index">
      <q-img :src="getUrlFile(images)" class="image-container__image" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imagesArray: {
    type: Array as PropType<File[]>,
    required: false,
    default: null,
  },
});

const getUrlFile = (image: File) => {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  return image;
};
</script>

<style scoped lang="scss">
.image-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  height: auto;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  gap: 10px;
  padding: 10px;
  //max-height: 500px;
  //overflow-y: auto;
  //overflow-x: hidden;

  &__image {
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.3);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
