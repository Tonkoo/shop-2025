<template>
  <svg
    class="areal-icon"
    :class="{
      'areal-icon_pointer': !noCursorPointer,
    }"
    :style="{
      padding: `${props.padding}px`,
    }"
    xmlns="http://www.w3.org/2000/svg"
    :width="getParamBySize"
    :height="getParamBySize"
    viewBox="0 0 24 24"
    :aria-labelledby="props.iconName"
  >
    <SpriteSymbol :name="props.iconName" no-wrapper />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { IconsType } from './types/IconsType';

defineOptions({
  name: 'ArealSvg',
});
const props = defineProps({
  iconName: {
    type: String as PropType<IconsType>,
    required: true,
  },
  padding: {
    type: Number,
    default: 0,
  },
  size: {
    type: [String, Number] as PropType<'S' | 'M' | 'L' | number>,
    default: 'M',
    validator: (value: string | number) =>
      typeof value === 'number' || ['S', 'M', 'L'].includes(value),
  },
  noCursorPointer: {
    type: Boolean,
    default: false,
  },
});
const paramsBySize = {
  L: 32,
  M: 24,
  S: 16,
};
const getParamBySize = computed(() => {
  const size =
    typeof props.size === 'number' ? props.size : paramsBySize[props.size];
  return size + props.padding * 2;
});
</script>

<style scoped lang="scss">
.areal-icon {
  -webkit-tap-highlight-color: transparent;
  fill: transparent;
  stroke: currentColor;
  user-select: none;
  &_pointer {
    cursor: pointer !important;
  }
}
</style>
