<template>
  <div class="radio" @click="handleClick">
    <input
      type="radio"
      :name="name"
      :checked="isChecked"
      :value="value"
      class="radio__input"
    />
    <label class="radio__label">
      <ArealSvg :icon-name="isChecked ? 'radioTrueIcon' : 'radioFalseIcon'" />
      <span>{{ label }}</span>
    </label>
  </div>

  <!--  <q-radio :model-value="modelValue" :val="val" :label="label" />-->
</template>

<script setup lang="ts">
import { useCatalogStore } from '~/modules/catalog/stores/catalogStore';

const catalogStore = useCatalogStore();
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  checked: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    required: false,
    default: null,
  },
  value: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
});

const handleClick = () => {
  catalogStore.setSort(props.value);
};

const isChecked = computed(() => {
  return props.modelValue === props.value;
});

defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
.radio {
  display: flex;
  &__input {
    display: none;
  }
  &__label {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    gap: 8px;
  }
}
</style>
