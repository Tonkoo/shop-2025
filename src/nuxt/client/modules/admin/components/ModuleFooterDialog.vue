<template>
  <q-card-actions align="left" class="dialog__card__footer">
    <areal-button
      label="Сохранить"
      color="black"
      icon="save"
      @click="adminStore.isEdit ? editItem() : addItem()"
    />
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
import { notifyConfig } from '~/entities/notify.entites';

const adminStore = useAdminStore();
const adminModule = useAdminModule();
const quasar = useQuasar();

async function addItem() {
  if (adminStore.typeItem === 'section') {
    await adminModule
      .addSection()
      .then(() => {
        adminStore.clearForms();
        adminStore.setViewModal(false);
        quasar.notify({
          //TODO: вынести в  quasar.notify в composable (positive и  negative)
          type: 'positive',
          message: 'Элемент успешно добавлен',
          position: 'top-right',
          timeout: notifyConfig.timeout,
        });
      })
      .catch((err) => {
        quasar.notify({
          type: 'negative',
          message: 'Ошибка при добавлении элемента: ' + err,
          position: 'top',
          timeout: notifyConfig.timeout,
        });
      });
  }
}

async function editItem() {
  if (adminStore.typeItem === 'section') {
    await adminModule
      .editSection()
      .then(() => {
        adminStore.clearForms();
        adminStore.setViewModal(false);
        quasar.notify({
          type: 'positive',
          message: 'Элемент успешно изменен',
          position: 'top-right',
          timeout: notifyConfig.timeout,
        });
      })
      .catch((err) => {
        quasar.notify({
          type: 'negative',
          message: 'Ошибка при добавлении элемента: ' + err,
          position: 'top',
          timeout: notifyConfig.timeout,
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
