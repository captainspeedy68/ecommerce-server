import { Schema, model, connect } from 'mongoose';
import TProduct, { TInventory, TVariant } from './product.interface';


const variantSchema = new Schema<TVariant>({
    type: { type: String, required: true },
    value: { type: String, required: true }
})

const inventorySchema = new Schema<TInventory>({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
})

//product schema 
const productSchema = new Schema<TProduct>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },

    variants: [variantSchema],

    inventory: inventorySchema
});


// creating a product model 
export const ProductModel = model<TProduct>("Product", productSchema);


// Sync indexes to ensure the unique constraint is applied
ProductModel.syncIndexes()
    .then(() => console.log("Indexes synced"))
    .catch(err => console.error("Error syncing indexes:", err));