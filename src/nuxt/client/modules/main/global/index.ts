import { getItemFooter, getSectionMenu } from '~/modules/main/api';

export function useMainModule() {
  return {
    getItemFooter,
    getSectionMenu,
  };
}
