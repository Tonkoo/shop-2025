import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(100, 'Название слишком длинное'),
  price: z
    .number({ message: 'Цена должна быть числом' })
    .min(10, 'Цена должна быть больше 10'),
  color: z.object({
    id: z.number().min(1, 'Пожалуйста, выберите цвет'),
    name: z.string(),
  }),
  section: z
    .object({
      id: z.number().min(1, 'Пожалуйста, выберите раздел'),
      name: z.string(),
    })
    .required(),
  description: z
    .string()
    .min(3, 'Описание должно содержать минимум 3 символа')
    .max(10000, 'Описание слишком длинное'),
});
