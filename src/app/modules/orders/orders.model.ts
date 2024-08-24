// import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { OrderModel, TOrder, TOrderMethods } from './orders.interface';
import { Product } from '../product/product.model';
import { ObjectId } from 'mongodb';

const orderSchema = new Schema<TOrder, OrderModel, TOrderMethods>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

orderSchema.methods.isOrderAvailable = async function (id: string) {
  const existingProduct = await Product.findOne(
    { _id: new ObjectId(id) },
    { 'inventory.inStock': true },
  );
  return existingProduct;
};

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
