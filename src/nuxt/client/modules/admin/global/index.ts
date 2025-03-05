import { getColumn, getAllCountColumn, getAllNameColumn } from '../api';
export function useAdminModule() {
  return { getColumn, getAllCountColumn, getAllNameColumn };
}
