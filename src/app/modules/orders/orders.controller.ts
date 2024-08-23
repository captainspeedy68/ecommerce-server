import { Request, Response } from 'express';
// import productValidationSchema from "../product/product.validation";
import { orderValidationSchema } from './orders.validation';
import { OrderServices } from './orders.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParseData = orderValidationSchema.parse(order);
    const result = await OrderServices.createOrderInDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Order saved successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Could not save order',
      err,
    });
  }
};

export const OrderControllers = {
  createOrder,
};
