import type { Section } from '~/interfaces/global';

type AdminState = {
  sectionItems: Section[];
  viewModal: boolean;
  typeItem: string;
  countColumn: number;
  currentPage: number;
  allCount: number;
  typeSearch: string;
};

export type { AdminState };
