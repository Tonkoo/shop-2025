import type { User } from '~/interfaces/adminGlobal';

type AuthorizationState = {
  user: User;
  error: boolean;
};

export type { AuthorizationState };
