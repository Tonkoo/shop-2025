<template>
  <div class="accordion">
    <div class="accordion__text" @click="toggleAccordion">
      <span>{{ label }}</span>
      <ArealSvg :icon-name="isOpen ? 'accordionClose' : 'accordionOpen'" />
    </div>
    <div ref="panelRef" class="accordion__panel">
      <div class="accordion__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';

defineProps({
  label: {
    type: String,
    default: '',
  },
});

const isOpen = ref(false);
const panelRef: Ref<HTMLElement | null> = ref(null);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;

  if (panelRef.value) {
    if (isOpen.value) {
      panelRef.value.style.maxHeight = panelRef.value.scrollHeight + 'px';
    } else {
      panelRef.value.style.maxHeight = '0px';
    }
  }
};

onMounted(() => {
  if (isOpen.value && panelRef.value) {
    panelRef.value.style.maxHeight = panelRef.value.scrollHeight + 'px';
  }
});
</script>

<style scoped lang="scss">
.accordion {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &__text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include font-preset('Text/16pxRegularCapitalized');
    color: getColor('black', 1);
    padding-top: 24px;
    padding-bottom: 16px;
  }
  &__panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
  &__content {
    padding-bottom: 8px;
  }
}
</style>
