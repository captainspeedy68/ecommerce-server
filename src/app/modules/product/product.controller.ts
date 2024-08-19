import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
    try{
        const product = req.body;
        // console.log(product)
    // will call service function
    const result = await ProductServices.createProductIntoDB(product);
    res.status(200).json({
        success: true,
        message: "Product created successfully",
        data: result
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Product creation failed!!!!",
            
        })
    }
}

export const ProductControllers = {
    createProduct
}