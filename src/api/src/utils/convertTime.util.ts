import { format } from 'date-fns';
import { Sections } from '../entities/sections.entity';
import { Products } from '../entities/products.entity';

export function convertTime(
  data: Sections[] | Products[],
): (Sections | Products)[] {
  return data.map((item): Sections | Products => ({
    ...item,
    create_at: format(new Date(item.create_at), 'dd.MM.yyyy HH:mm'),
    update_at: format(new Date(item.update_at), 'dd.MM.yyyy HH:mm'),
  }));
}
