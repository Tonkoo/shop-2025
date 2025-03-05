type Section = {
  id: number;
  code: string;
  name: string;
  images: ImageType[];
  create_at: string;
  update_at: string;
  id_parent: number | null;
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

export type { Section, TypeSearch, Product };
