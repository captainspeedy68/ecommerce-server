import { Request, Response } from 'express';
// import productValidationSchema from "../product/product.validation";
import { orderValidationSchema } from './orders.validation';
import { OrderServices } from './orders.service';

// const available = async(id: string, quantity: number) => {
//   try{
//     const isAvailable = await OrderServices.availableInDB(
//       id,
//       quantity,
//     );
//     if (isAvailable){
//       await OrderServices.reduceQuantityFromDB(id,quantity);
//       console.log("Yes available")
//     }
//     return isAvailable

//   }catch{
//     throw new Error("Unable to make order")
//   }
// }

const createOrder = async (req: Request, res: Response) => {
  try {
    console.log('Hit');
    const order = req.body;
    const zodParseData = orderValidationSchema.parse(order);

    // const isAvailable = await OrderServices.availableInDB(
    //   order.id,
    //   order.quantity,
    // );
    const isAvailable = await OrderServices.availableInDB(
      order.productId,
      order.quantity,
    );
    // const isAvailable = true;
    if (isAvailable) {
      await OrderServices.reduceQuantityFromDB(order.productId,order.quantity);
      const result = await OrderServices.createOrderInDB(zodParseData);
      res.status(200).json({
        success: true,
        message: 'Order saved successfully',
        data: result,
      });
    } else {
      throw new Error('Product not available');
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Could not save order',
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
        message: 'Order recieved successfully',
        data: result,
      });
    } else {
      const result = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Order recieved successfully',
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Could not retrieve order',
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
