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
}
const getSingleOrderFromDB = async (email: string) => {
    const result = await Order.find({email: email});
    return result;
}

export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB
};
