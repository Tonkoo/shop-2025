import { getItems } from '~/modules/main/api';

export function useMainModule() {
  return {
    getItems,
  };
}
