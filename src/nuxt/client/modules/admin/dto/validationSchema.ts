import { z } from 'zod';

export const sectionSchema = z.object({
  name: z
    .string()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(100, 'Название слишком длинное'),
});
