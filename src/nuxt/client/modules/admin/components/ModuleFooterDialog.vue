<template>
  <q-card-actions align="left" class="dialog__card__footer">
    <areal-button label="Добавить" color="black" icon="save" @click="AddItem" />
    <areal-button
      outline
      label="Отмена"
      @click="adminStore.setViewModal(false)"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useAdminModule } from '~/modules/admin/global';
import { useQuasar } from 'quasar';

const adminStore = useAdminStore();
const adminModule = useAdminModule();
const quasar = useQuasar();

async function AddItem() {
  if (adminStore.typeItem == 'section') {
    await adminModule
      .addSection()
      .then(() => {
        adminStore.clearForms();
        quasar.notify({
          type: 'positive',
          message: 'Элемент успешно добавлен',
          position: 'top-right',
          timeout: 2500,
        });
      })
      .catch((err) => {
        quasar.notify({
          type: 'negative',
          message: 'Ошибка при добавлении элемента: ' + err,
          position: 'top',
          timeout: 2500,
        });
      });
  }
}
</script>

<style scoped lang="scss">
.dialog__card__footer {
  border-top: 1px solid #ddd;
}
</style>
