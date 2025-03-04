import { getSection, getAllCountColumn } from '../api';
export function useAdminModule() {
  return { getSection, getAllCountColumn };
}
