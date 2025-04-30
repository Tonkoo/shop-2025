import { format } from 'date-fns';
import { Products } from '../entities/products.entity';
import { Sections } from '../entities/sections.entity';
import { ProductClient, SectionClient } from '../interfaces/global';

/**
 * Конвертирует дату в формат dd.MM.yyyy HH:mm для ElasticSearch
 * @param data
 */
export function convertTimeObject(
  data: Products | Sections,
): ProductClient | SectionClient {
  return {
    ...data,
    create_at: format(new Date(data.create_at), 'dd.MM.yyyy HH:mm'),
    update_at: format(new Date(data.update_at), 'dd.MM.yyyy HH:mm'),
  };
}
