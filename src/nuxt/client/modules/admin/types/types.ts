import type { Section } from '~/interfaces/global';

type AdminState = {
  //TODO: Написать интерфейс для типизации items
  sectionItems: Section[];
  viewModal: boolean;
  typeItem: string;
  countColumn: number;
};

export type { AdminState };
