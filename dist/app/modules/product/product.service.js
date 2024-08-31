"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const mongodb_1 = require("mongodb");
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await ProductModel.create(product);
    const productInstance = new product_model_1.Product(product); //creating a user instance
    if (yield productInstance.doesProductExist(product.name)) {
        throw new Error('Product already exists');
    }
    const result = yield productInstance.save();
    return result;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: id });
    return result;
});
const getAProductFromQuery = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({
        name: { $regex: searchTerm, $options: 'i' },
    });
    return result;
});
const updateAProductFromDB = (product, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: Object.assign({}, product) });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    getAProductFromQuery,
    updateAProductFromDB,
    deleteProductFromDB,
};
