<template>
  <WgMainContainer />
</template>
<script setup lang="ts">
import { useMainModule } from '~/modules/main/global';
import { useQuasar } from 'quasar';
import { notifyNegative } from '~/entities/notify.entites';

const mainModule = useMainModule();
const quasar = useQuasar();

onMounted(async () => {
  await mainModule.getItems().catch((err) => {
    quasar.notify({
      ...notifyNegative,
      message: err,
    });
  });
});
</script>

<style scoped></style>
