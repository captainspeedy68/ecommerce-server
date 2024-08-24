import { Request, Response } from 'express';
// import productValidationSchema from "../product/product.validation";
import { orderValidationSchema } from './orders.validation';
import { OrderServices } from './orders.service';
import { Order } from './orders.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParseData = orderValidationSchema.parse(order);

    const isAvailable = await OrderServices.availableInDB(order);

    if (!isAvailable) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
      return;
    } else {
      // reducing quantity and change instock info if needed
      await OrderServices.reduceQuantityFromDB(order.productId, order.quantity);

      const result = await OrderServices.createOrderInDB(zodParseData);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Order not found',
      err,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const emailQuery = req.query.email;
    if (emailQuery) {
      const result = await OrderServices.getSingleOrderFromDB(
        emailQuery as string,
      );
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      const result = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Could not retrieve order',
      err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
