import { Router } from "express";
const router = Router();
import {getProductsController, getProductController, getProductsByCategoryController, postProductController, updateProductController, deleteProductController } from '../controllers/productController.js'

router.get("/", getProductsController);

router.get("/api/products", getProductsController);

router.get("/api/products/product/:id", getProductController);

router.get("/api/products/:category", getProductsByCategoryController)

router.post("/api/products", postProductController);

router.put("/api/products/product/:id", updateProductController);

router.delete("/api/products/product/:id", deleteProductController);

export default router;