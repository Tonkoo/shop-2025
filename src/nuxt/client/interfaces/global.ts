// TODO: расскидать по отдельным файлам
import type { ImageObject } from '~/interfaces/adminGlobal';

type Section = {
  id: number;
  code: string;
  name: string;
  createAt?: string;
  updateAt?: string;
  idParent?: number | null;
  level: number;
  imageObject?: ImageObject[];
};

type Product = {
  id: number;
  code: string;
  name: string;
  price: number;
  idColor: number;
  description: string;
  showOnMain: boolean;
  mainSlider: boolean;
  createAt?: string;
  updateAt?: string;
  idSection: number;
  imageObject?: ImageObject[];
};

export type { Product, Section };
