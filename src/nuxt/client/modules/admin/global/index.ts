import { getColumn, getAllNameColumn, addSection } from '../api';
export function useAdminModule() {
  return { getColumn, getAllNameColumn, addSection };
}
