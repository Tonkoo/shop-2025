import type { SectionMain } from '~/interfaces/mainGlobal';

export type LayoutType = {
  sidebar: boolean;
  menu: SectionMain[];
  typePage: string;
  pathPage: string;
};
