import express from "express"
import { ProductControllers } from "./product.controller"

const router = express.Router()


// the routes will call controller functions
router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getSingleProduct);
router.put("/:productId", ProductControllers.updateAProduct);

export const ProductRoute = router;