<template>
  <div v-if="imagesArray && imagesArray.length" class="gallery q-mb-md">
    <div v-for="(images, index) in imagesArray" :key="index">
      <q-img :src="getUrlFile(images)" class="gallery__image" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imagesArray: {
    type: Array as PropType<File[] | undefined>,
    required: false,
    default: null,
  },
});

const getUrlFile = (image: File) => {
  if (image instanceof File) {
    console.log(image, image);
    return URL.createObjectURL(image);
  }
  return image;
};
</script>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  height: auto;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  gap: 10px;
  padding: 10px;

  &__image {
    width: 100%;
    height: auto;
    transition: all 0.3s ease;
    border-radius: 4px;

    &:hover {
      transform: scale(1.3);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      z-index: 1;
    }
  }
}
</style>
