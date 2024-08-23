import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email('Email is not valid'),
  productId: z.string(),
  price: z.number().positive('Price must be a positive number'),
  quantity: z.number().min(0, 'Quantity must be a non-negative number'),
});
