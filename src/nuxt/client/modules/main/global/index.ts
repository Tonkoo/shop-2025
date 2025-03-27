import { getSection, getProduct } from '~/modules/main/api';

export function useMainModule() {
  return {
    getSection,
    getProduct,
  };
}
