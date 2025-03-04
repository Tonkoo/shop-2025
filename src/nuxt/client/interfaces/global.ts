type Section = {
  id: number;
  code: string;
  name: string;
  images: ImageType[];
  create_at: string;
  update_at: string;
  id_parent: number | null;
};

type ImageType = {
  alt: string;
  src: string;
};

export type { Section };
