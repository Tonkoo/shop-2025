import { defineStore } from 'pinia';
import type { AuthorizationState } from '~/modules/authorization/types/types';

export const useAuthorizationStore = defineStore('authorization-store', {
  state: (): AuthorizationState => ({
    user: {
      username: '',
      password: '',
    },
  }),
  actions: {
    setUsername(value: string) {
      this.user.username = value;
    },
    setPassword(value: string) {
      this.user.password = value;
    },
  },
});
