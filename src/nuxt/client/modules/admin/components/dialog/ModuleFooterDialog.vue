<template>
  <q-card-actions align="left" class="dialog__card__footer">
    <areal-button
      :label="$t('admin.label.save')"
      color="black"
      icon="save"
      :disable="adminStore.disableBtn"
      @click="adminStore.isEdit ? editItem() : addItem()"
    />
    <areal-button
      outline
      :label="$t('admin.label.cancel')"
      @click="adminStore.setViewModal(false)"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useAdminModule } from '~/modules/admin/global';
import { useQuasar } from 'quasar';
import { notifyPositive, notifyNegative } from '~/entities/notify.entites';
import type { responseError } from '~/interfaces/global';

const adminStore = useAdminStore();
const adminModule = useAdminModule();
const quasar = useQuasar();

async function addItem() {
  adminStore.setDisableBtn(true);
  await adminModule
    .addItem()
    .then(() => {
      adminStore.clearForms();
      adminStore.setViewModal(false);
      quasar.notify(notifyPositive);
      adminStore.setDisableBtn(false);
    })
    .catch((err: responseError) => {
      adminStore.setDisableBtn(false);
      quasar.notify({
        ...notifyNegative,
        message: 'Ошибка при сохранении данных: ' + err.response.data.message,
      });
    });
}

async function editItem() {
  await adminModule
    .editItem()
    .then(() => {
      adminStore.clearForms();
      adminStore.setViewModal(false);
      quasar.notify(notifyPositive);
    })
    .catch((err: responseError) => {
      quasar.notify({
        ...notifyNegative,
        message: 'Ошибка при сохранении данных: ' + err.response.data.message,
      });
    });
}
</script>

<style scoped lang="scss">
.dialog__card__footer {
  border-top: 1px solid #ddd;
}
</style>
