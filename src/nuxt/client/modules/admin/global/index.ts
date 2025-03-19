import {
  getItems,
  getAllNameColumn,
  addItem,
  getSection,
  editItem,
  delSection,
} from '../api';
export function useAdminModule() {
  return {
    getItems,
    getAllNameColumn,
    addItem,
    getSection,
    editItem,
    delSection,
  };
}
