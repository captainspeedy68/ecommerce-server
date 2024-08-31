"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// the routes will call controller functions
router.post('/', product_controller_1.ProductControllers.createProduct);
router.get('/', product_controller_1.ProductControllers.getAllProducts);
router.get('/:productId', product_controller_1.ProductControllers.getSingleProduct);
router.put('/:productId', product_controller_1.ProductControllers.updateAProduct);
router.delete('/:productId', product_controller_1.ProductControllers.deleteAProduct);
// router.get("/?searchTerm=iphone", ProductControllers.deleteAProduct);
exports.ProductRoute = router;
