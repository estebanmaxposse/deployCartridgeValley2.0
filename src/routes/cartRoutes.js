import { Router } from "express";
const router = Router();
import { getNewCartController, getAllCartsController, addProductsController, getProductsController, getCartController, deleteCartController, deleteProductCartController, clearCartController, getCartByUserIDController } from '../controllers/cartController.js'

router.post("/", getNewCartController);

router.get('/', getAllCartsController)

router.post("/:id/products", addProductsController);

router.get("/:id/products", getProductsController);

router.get("/:id", getCartController)

router.get("/user/:id", getCartByUserIDController)

router.delete("/:id", deleteCartController)

router.delete("/:id/products/:id_prod", deleteProductCartController)

router.put("/:id", clearCartController)

export default router;