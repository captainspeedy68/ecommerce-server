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
exports.OrderServices = void 0;
const mongodb_1 = require("mongodb");
const product_model_1 = require("../product/product.model");
const orders_model_1 = require("./orders.model");
const createOrderInDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const orderInstance = new orders_model_1.Order(order);
    const result = yield orderInstance.save();
    return result;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.find();
    return result;
});
const getSingleOrderFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.find({ email: email });
    return result;
});
const availableInDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const orderInstance = new orders_model_1.Order(order);
    if (!(yield orderInstance.doesProductExist(order.productId))) {
        throw new Error('Order not found');
    }
    const id = order.productId;
    const quantity = order.quantity;
    const availableProduct = yield product_model_1.Product.findOne({
        _id: new mongodb_1.ObjectId(id),
        $or: [
            { 'inventory.quantity': { $gt: quantity } },
            { 'inventory.quantity': { $eq: quantity } },
        ],
    });
    return availableProduct;
});
const reduceQuantityFromDB = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_model_1.Product.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $inc: { 'inventory.quantity': -quantity } });
    // set instock to false if quantity is zero
    yield product_model_1.Product.updateOne({ _id: new mongodb_1.ObjectId(id), 'inventory.quantity': { $lte: 0 } }, { 'inventory.inStock': false });
    // return result;
});
exports.OrderServices = {
    createOrderInDB,
    getAllOrdersFromDB,
    getSingleOrderFromDB,
    availableInDB,
    reduceQuantityFromDB,
};
