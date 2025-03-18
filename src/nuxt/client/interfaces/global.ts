type Section = {
  id: number;
  code: string;
  name: string;
  images: File[];
  create_at?: string;
  update_at?: string;
  id_parent: number | null;
  parent?: ParentSection;
  imageObject?: ImageObject[];
};

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

type ResultItems = {
  items: Section[] | Product[];
  total: number;
};
type ImageObject = {
  id: number;
  name: string;
  path: string;
  type: string;
};

type TypeFile = {
  id?: number;
  file: File;
  del: boolean;
};

type Param = {
  type: string;
  from: string;
  size: string;
  searchName: string;
  getSection?: boolean;
};
type Err = {
  name: boolean;
};

export type {
  Section,
  TypeSearch,
  Product,
  Search,
  ParentSection,
  ResultItems,
  ImageObject,
  TypeFile,
  Param,
  Err,
};
