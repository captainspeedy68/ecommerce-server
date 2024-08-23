import { TOrder } from './orders.interface';
import { Order } from './orders.model';

const createOrderInDB = async (order: TOrder) => {
  const orderInstance = new Order(order);
  const result = await orderInstance.save();
  return result;
};

export const OrderServices = {
  createOrderInDB,
};
