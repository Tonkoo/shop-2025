<template>
  <q-card-actions align="left" class="dialog__card__footer">
    <areal-button label="Добавить" color="black" icon="save" />
    <areal-button
      outline
      label="Отмена"
      @click="adminStore.setViewModal(false)"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';

const adminStore = useAdminStore();
</script>

<style scoped lang="scss">
.dialog__card__footer {
  border-top: 1px solid #ddd;
}
</style>
