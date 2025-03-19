<template>
  <ArealDeleteDialog :model-value="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Подтверждение</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-avatar icon="delete_forever" text-color="black" />
        Вы уверены,что хотите удалить данную запись?</q-card-section
      >

      <q-card-actions align="right" class="text-primary">
        <areal-button
          label="Удалить"
          color="black"
          icon="delete"
          @click="delItem"
        />
        <areal-button label="Отмена" @click="adminStore.setDelDialog(false)" />
      </q-card-actions>
    </q-card>
  </ArealDeleteDialog>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/modules/admin/stores/adminStore';
import { useAdminModule } from '~/modules/admin/global';
import { notifyNegative, notifyPositive } from '~/entities/notify.entites';
import { useQuasar } from 'quasar';

const adminStore = useAdminStore();
const adminModule = useAdminModule();
const quasar = useQuasar();

const dialog = computed(() => adminStore.delDialog);

async function delItem() {
  if (adminStore.typeItem === 'section') {
    await adminModule
      .delSection()
      .then(() => {
        adminStore.clearForms();
        adminStore.setDelDialog(false);
        quasar.notify(notifyPositive);
      })
      .catch((err) => {
        quasar.notify({
          ...notifyNegative,
          message: 'Ошибка при сохранении данных: ' + err,
        });
      });
  }
}
</script>

<style scoped></style>
