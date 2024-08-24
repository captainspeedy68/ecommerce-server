import { Model } from 'mongoose';
import TProduct from '../product/product.interface';

export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export type TOrderMethods = {
  doesProductExist(id: string): Promise<TProduct | null>;
};

export type OrderModel = Model<TOrder, Record<string, never>, TOrderMethods>;
