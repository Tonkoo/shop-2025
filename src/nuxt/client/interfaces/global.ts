type Section = {
  id: number;
  code: string;
  name: string;
  images: File[];
  create_at?: string;
  update_at?: string;
  id_parent: number | null;
  parent?: ParentSection;
  imageObject?: imageObject[];
};

type SectionBack = Section;
type Product = {
  id: number;
  code: string;
  name: string;
  images: ImageType[];
  price: number;
  color: string;
  description: string;
  show_on_main: boolean;
  main_slider: boolean;
  id_section: number;
  create_at: string;
  update_at: string;
};

type ImageType = {
  alt: string;
  src: string;
};

interface TypeSearch {
  label: string;
  value: string;
}

interface Search {
  id: number;
  name: string;
}

type ParentSection = {
  id: number;
  name: string;
};

type resultItems = {
  items: Section[] | Product[];
  total: number;
};
type imageObject = {
  id: number;
  name: string;
  path: string;
  type: string;
};

type typeFile = {
  id?: number;
  file: File;
  del: boolean;
};

export type {
  Section,
  TypeSearch,
  Product,
  Search,
  ParentSection,
  resultItems,
  imageObject,
  typeFile,
  SectionBack,
};
