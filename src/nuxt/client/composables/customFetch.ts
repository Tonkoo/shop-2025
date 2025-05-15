import { useAuthorizationModule } from '~/modules/authorization/global';
import { api } from '#shared/api/axios';
import type { AuthorizationResponse } from '~/interfaces/resultGlobal';

export const headersForm = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const headersAuth = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

export const test = async () => {};
