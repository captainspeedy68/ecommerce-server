"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
exports.orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email is not valid'),
    productId: zod_1.z.string(),
    price: zod_1.z.number().positive('Price must be a positive number'),
    quantity: zod_1.z.number().min(0, 'Quantity must be a non-negative number'),
});
