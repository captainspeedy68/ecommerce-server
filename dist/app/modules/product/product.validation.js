"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Variant Schema
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, 'Variant type is required'),
    value: zod_1.z.string().min(1, 'Variant value is required'),
});
// Inventory Schema
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, 'Quantity must be a non-negative number'),
    inStock: zod_1.z.boolean(),
});
// Product Schema
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Product name is required'),
    description: zod_1.z.string().min(1, 'Product description is required'),
    price: zod_1.z.number().positive('Price must be a positive number'),
    category: zod_1.z.string().min(1, 'Category is required'),
    tags: zod_1.z.array(zod_1.z.string().min(1)).nonempty('At least one tag is required'),
    variants: zod_1.z.array(variantValidationSchema),
    inventory: inventoryValidationSchema,
});
exports.default = productValidationSchema;
