import type { QNotifyCreateOptions } from 'quasar';

const notifyConfig = {
  timeout: 2500,
};

export const notifyPositive: QNotifyCreateOptions = {
  type: 'positive',
  message: 'Данные сохранены',
  position: 'top-right',
  timeout: notifyConfig.timeout,
};

export const notifyNegative: QNotifyCreateOptions = {
  type: 'negative',
  position: 'top',
  timeout: notifyConfig.timeout,
};
