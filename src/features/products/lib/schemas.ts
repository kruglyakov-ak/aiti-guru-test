import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  brand: z.string().min(1, 'Вендор обязателен'),
  sku: z.string().min(1, 'Артикул обязателен'),
  rating: z.number().min(0).max(5),
  price: z.number().positive('Цена должна быть положительной'),
});

export type ProductFormValues = z.infer<typeof productSchema>;