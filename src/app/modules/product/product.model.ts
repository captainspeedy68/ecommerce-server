import { Schema, model } from 'mongoose';
import TProduct, {
  ProductModel,
  TInventory,
  TProductMethods,
  TVariant,
} from './product.interface';

const variantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

//product schema
const productSchema = new Schema<TProduct, ProductModel, TProductMethods>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },

  variants: [variantSchema],

  inventory: inventorySchema,
});

// productSchema.pre("save", function(){
//     console.log(this, "pre");
// })
// productSchema.post("save", function(){
//     console.log(this, "post hook, after saving the data");
// })

// using static method to check if product already exists
productSchema.methods.doesProductExist = async function (name: string) {
  const existingProduct = Product.findOne({ name: name });
  return existingProduct;
};

// creating a product model
export const Product = model<TProduct, ProductModel>('Product', productSchema);

// Sync indexes to ensure the unique constraint is applied
// Product.syncIndexes()
//     .then(() => console.log("Indexes synced"))
//     .catch(err => console.error("Error syncing indexes:", err));
