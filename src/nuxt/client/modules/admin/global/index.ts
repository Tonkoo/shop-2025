import {
  getItems,
  getAllNameColumn,
  addItem,
  getItem,
  editItem,
  delSection,
} from '../api';
export function useAdminModule() {
  return {
    getItems,
    getAllNameColumn,
    addItem,
    getItem,
    editItem,
    delSection,
  };
}
