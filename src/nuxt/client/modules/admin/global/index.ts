import { getItems, getAllNameColumn, addSection, getSection } from '../api';
export function useAdminModule() {
  return { getItems, getAllNameColumn, addSection, getSection };
}
