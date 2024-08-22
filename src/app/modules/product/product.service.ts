import TProduct from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (product: TProduct) =>{
    // const result = await ProductModel.create(product);
    const productInstance = new Product(product);//creating a user instance
    if(await productInstance.doesProductExist(product.name)){
        throw new Error("Product already exists")
    }

    const result = await productInstance.save()
    return result
};
const getAllProductsFromDB = async () =>{
    const result = await Product.find();
    return result
};
const getSingleProductFromDB = async (id: string ) =>{
    const result = await Product.findOne({_id: id });
    return result
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB
}