import {
  getItems,
  getAllNameColumn,
  addItem,
  getItemById,
  editItem,
  delItem,
  reindex,
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
  };
}
