import { z } from 'zod';

// Variant Schema
const variantValidationSchema = z.object({
  type: z.string().min(1, 'Variant type is required'),
  value: z.string().min(1, 'Variant value is required'),
});

// Inventory Schema
const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, 'Quantity must be a non-negative number'),
  inStock: z.boolean(),
});

// Product Schema
const productValidationSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Product description is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string().min(1)).nonempty('At least one tag is required'),

  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
