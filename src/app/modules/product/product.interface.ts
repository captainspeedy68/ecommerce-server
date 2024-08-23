import { Model } from 'mongoose';

export type TVariant = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

// creating a product type
type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
};

export default TProduct;
// creating static methods
export type TProductMethods = {
  doesProductExist(name: string): Promise<TProduct | null>;
};

export type ProductModel = Model<
  TProduct,
  Record<string, never>,
  TProductMethods
>;
