import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import { ObjectId } from 'mongodb';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // data validation using zod
    const zodParseData = productValidationSchema.parse(product);

    // will call service function
    const result = await ProductServices.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'Product creation failed!!!!',
    });
  }
};
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'Products failed get!!!!',
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(id);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Product is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'Products failed get!!!!',
    });
  }
};
const updateAProduct = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const productId = req.params.productId;
    console.log(updateData, productId);
    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
      });
    }
    const result = await ProductServices.updateAProductFromDB(
      updateData,
      productId,
    );
    console.log(result);
    if (result.matchedCount === 0) {
        throw new Error("Product not found");
      }
    
      if (result.modifiedCount === 0) {
        throw new Error("No changes were made");
      }
      res.status(200).json({
        success: true,
        message: 'Product is updated successfully',
        data: result,
      });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Products failed to update!!!!',
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateAProduct
};
