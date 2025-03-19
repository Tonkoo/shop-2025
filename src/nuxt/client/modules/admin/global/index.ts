import {
  getItems,
  getAllNameColumn,
  addSection,
  getSection,
  editSection,
  delSection,
} from '../api';
export function useAdminModule() {
  return {
    getItems,
    getAllNameColumn,
    addSection,
    getSection,
    editSection,
    delSection,
  };
}
