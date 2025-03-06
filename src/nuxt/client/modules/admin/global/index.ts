import {
  getColumn,
  getAllCountColumn,
  getAllNameColumn,
  addSection,
} from '../api';
export function useAdminModule() {
  return { getColumn, getAllCountColumn, getAllNameColumn, addSection };
}
