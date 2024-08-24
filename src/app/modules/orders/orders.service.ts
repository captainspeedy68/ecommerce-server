import { ObjectId } from 'mongodb';
import { Product } from '../product/product.model';
import { TOrder } from './orders.interface';
import { Order } from './orders.model';

const createOrderInDB = async (order: TOrder) => {
  const orderInstance = new Order(order);
  const result = await orderInstance.save();
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};
const getSingleOrderFromDB = async (email: string) => {
  const result = await Order.find({ email: email });
  return result;
};

const availableInDB = async (order: TOrder) => {
  const orderInstance = new Order(order);
  if (!(await orderInstance.doesProductExist(order.productId))){
    throw new Error("Order not found");
  }
  const id = order.productId;
  const quantity = order.quantity;
  const availableProduct = await Product.findOne({
    _id: new ObjectId(id),
    $or: [
      { 'inventory.quantity': { $gt: quantity } },
      { 'inventory.quantity': { $eq: quantity } },
    ],
  });


  return availableProduct;
};

const reduceQuantityFromDB = async (id: string, quantity: number) => {
  await Product.updateOne(
    { _id: new ObjectId(id) },
    { $inc: { 'inventory.quantity': -quantity } },
  );

  // set instock to false if quantity is zero
  await Product.updateOne(
    { _id: new ObjectId(id), 'inventory.quantity': { $lte: 0 } },
    { 'inventory.inStock': false },
  );
  // return result;
};

export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  availableInDB,
  reduceQuantityFromDB,
};
