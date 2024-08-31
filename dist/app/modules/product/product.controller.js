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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const mongodb_1 = require("mongodb");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        // data validation using zod
        const zodParseData = product_validation_1.default.parse(product);
        // will call service function
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParseData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    }
    catch (err) {
        // console.log(err);
        res.status(400).json({
            success: false,
            message: 'Product creation failed!!!!',
            err,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm || '';
        if (searchTerm) {
            const result = yield product_service_1.ProductServices.getAProductFromQuery(searchTerm);
            res.status(200).json({
                success: true,
                message: `Product with the term ${searchTerm} retrieved successfully`,
                data: result,
            });
        }
        else {
            const result = yield product_service_1.ProductServices.getAllProductsFromDB();
            // console.log(result);
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result,
            });
        }
    }
    catch (err) {
        // console.log(err);
        res.status(400).json({
            success: false,
            message: 'Products failed get!!!!',
            err,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(id);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        // console.log(err);
        res.status(400).json({
            success: false,
            message: 'Products failed get!!!!',
            err,
        });
    }
});
const updateAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = req.body;
        const productId = req.params.productId;
        // console.log(updateData, productId);
        if (!mongodb_1.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID',
            });
        }
        const result = yield product_service_1.ProductServices.updateAProductFromDB(updateData, productId);
        // console.log(result);
        if (result.matchedCount === 0) {
            throw new Error('Product not found');
        }
        if (result.modifiedCount === 0) {
            throw new Error('No changes were made');
        }
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Products failed to update!!!!',
            err,
        });
    }
});
const deleteAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Products failed to be delete!!!!',
            err,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateAProduct,
    deleteAProduct,
};
