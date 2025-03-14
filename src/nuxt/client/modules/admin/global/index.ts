import {
  getItems,
  getAllNameColumn,
  addSection,
  getSection,
  editSection,
} from '../api';
export function useAdminModule() {
  return { getItems, getAllNameColumn, addSection, getSection, editSection };
}
