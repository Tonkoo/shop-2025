type Section = {
  id: number;
  code: string;
  name: string;
  //TODO: свой интерфейс
  images: number[];
  create_at: string;
  update_at: string;
  id_parent: number | null;
};

export type { Section };
