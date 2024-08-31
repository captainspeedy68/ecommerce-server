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
exports.Order = void 0;
// import { ObjectId } from 'mongodb';
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
const mongodb_1 = require("mongodb");
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
orderSchema.methods.doesProductExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield product_model_1.Product.findOne({ _id: new mongodb_1.ObjectId(id) });
        return existingProduct;
    });
};
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
