import type { ProductMain, SectionMain } from '~/interfaces/global';

export type MainType = {
  sidebar: boolean;
  mainGifts: ProductMain[];
  mainSlider: ProductMain[];
  menu: SectionMain[];
};
