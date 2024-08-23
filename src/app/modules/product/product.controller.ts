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
    // console.log(err);
    res.status(400).json({
      success: false,
      message: 'Product creation failed!!!!',
      err,
    });
  }
};
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm || '';
    if (searchTerm) {
      const result = await ProductServices.getAProductFromQuery(
        searchTerm as string,
      );
      res.status(200).json({
        success: true,
        message: `Product with the term ${searchTerm} retrieved successfully`,
        data: result,
      });
    } else {
      const result = await ProductServices.getAllProductsFromDB();
      // console.log(result);
      res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: result,
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      success: false,
      message: 'Products failed get!!!!',
      err,
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Product is retrieved successfully',
      data: result,
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      success: false,
      message: 'Products failed get!!!!',
      err,
    });
  }
};
const updateAProduct = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const productId = req.params.productId;
    // console.log(updateData, productId);
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
    // console.log(result);
    if (result.matchedCount === 0) {
      throw new Error('Product not found');
    }

    if (result.modifiedCount === 0) {
      throw new Error('No changes were made');
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
      err,
    });
  }
};

const deleteAProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product is deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Products failed to be delete!!!!',
      err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateAProduct,
  deleteAProduct,
};
