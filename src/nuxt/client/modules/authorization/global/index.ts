import { authorizationUser, introspect } from '../api';
export function useAuthorizationModule() {
  return {
    authorizationUser,
    introspect,
  };
}
