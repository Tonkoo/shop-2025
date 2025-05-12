import {
  getItems,
  getAllNameColumn,
  addItem,
  getItemById,
  editItem,
  delItem,
  reindex,
  getColors,
  logout,
} from '../api';
export function useAdminModule() {
  return {
    getItems,
    getAllNameColumn,
    addItem,
    getItemById,
    editItem,
    delItem,
    reindex,
    getColors,
    logout,
  };
}
