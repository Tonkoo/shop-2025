import {
  getItems,
  getAllNameColumn,
  addItem,
  getItem,
  editItem,
  delItem,
  reindex,
} from '../api';
export function useAdminModule() {
  return {
    getItems,
    getAllNameColumn,
    addItem,
    getItem,
    editItem,
    delItem,
    reindex,
  };
}
