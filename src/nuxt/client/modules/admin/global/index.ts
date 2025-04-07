import {
  getItems,
  getAllNameColumn,
  addItem,
  getItemById,
  editItem,
  delItem,
  reindex,
  getColors,
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
  };
}
