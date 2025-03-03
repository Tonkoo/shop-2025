import type { Section } from '~/interfaces/global';

type AdminState = {
  //TODO: Написать интерфейс для типизации items
  sectionItems: Section[];
  viewModal: boolean;
};

export type { AdminState };
