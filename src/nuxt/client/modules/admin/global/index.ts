import { getColumn, getAllCountColumn } from '../api';
export function useAdminModule() {
  return { getColumn, getAllCountColumn };
}
