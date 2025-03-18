import { format } from 'date-fns';
import { Products } from '../entities/products.entity';
import { Sections } from '../entities/sections.entity';
import { ProductClient, SectionClient } from '../interfaces/global';

//TODO: Сделать интерфейс

export function convertTimeObject(
  data: Products | Sections,
): ProductClient | SectionClient {
  console.log(data);
  return {
    ...data,
    create_at: format(new Date(data.create_at), 'dd.MM.yyyy HH:mm'),
    update_at: format(new Date(data.update_at), 'dd.MM.yyyy HH:mm'),
  };
}

export function convertTimeArray(
  data: (Products | Sections)[],
): (SectionClient | ProductClient)[] {
  return data.map((item): ProductClient | SectionClient =>
    convertTimeObject(item),
  );
}
