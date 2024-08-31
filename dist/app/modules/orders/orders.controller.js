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
exports.OrderControllers = void 0;
// import productValidationSchema from "../product/product.validation";
const orders_validation_1 = require("./orders.validation");
const orders_service_1 = require("./orders.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const zodParseData = orders_validation_1.orderValidationSchema.parse(order);
        const isAvailable = yield orders_service_1.OrderServices.availableInDB(order);
        if (!isAvailable) {
            res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
            return;
        }
        else {
            // reducing quantity and change instock info if needed
            yield orders_service_1.OrderServices.reduceQuantityFromDB(order.productId, order.quantity);
            const result = yield orders_service_1.OrderServices.createOrderInDB(zodParseData);
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Order not found',
            err,
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailQuery = req.query.email;
        if (emailQuery) {
            const result = yield orders_service_1.OrderServices.getSingleOrderFromDB(emailQuery);
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: result,
            });
        }
        else {
            const result = yield orders_service_1.OrderServices.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Could not retrieve order',
            err,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getOrders,
};
