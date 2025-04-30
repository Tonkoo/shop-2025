import type { Section, Product } from './global';
import type { ImageElastic } from '~/interfaces/adminGlobal';

// TODO: расскидать по отдельным файлам

type SectionMain = Section & {
  images: ImageElastic[];
  id_parent?: number;
  url: string;
  items?: SectionMain[];
};

type ProductMain = Product & {
  images: ImageElastic[];
  hexColor: string;
  url: string;
  sectionName: string;
};

export type { SectionMain, ProductMain };
