import { authorizationUser, introspect, refreshToken } from '../api';
export function useAuthorizationModule() {
  return {
    authorizationUser,
    introspect,
    refreshToken,
  };
}
