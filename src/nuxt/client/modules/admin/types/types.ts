import type { Section } from '~/interfaces/global';

type AdminState = {
  sectionItems: Section[];
  viewModal: boolean;
  typeItem: string;
  countColumn: number;
  currentPage: number;
  AllCount: number;
};

export type { AdminState };
