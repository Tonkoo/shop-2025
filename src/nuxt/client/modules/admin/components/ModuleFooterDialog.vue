<template>
  <q-card-actions align="left" class="dialog__card__footer">
    <areal-button label="Добавить" color="black" icon="save" />
    <areal-button outline label="Отмена" @click="closeDialog" />
  </q-card-actions>
</template>

<script lang="ts">
import { inject } from 'vue';

export default {
  setup() {
    const closeDialog = inject<() => void>('closeDialog');
    return {
      closeDialog,
    };
  },
};
</script>

<style scoped lang="scss">
.dialog__card__footer {
  border-top: 1px solid #ddd;
}
</style>
