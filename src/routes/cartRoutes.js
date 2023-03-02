import { Router } from "express";
const router = Router();
import { getNewCartController, getAllCartsController, addProductsController, getProductsController, getCartController, deleteCartController, deleteProductCartController } from '../controllers/cartController.js'

router.post("/", getNewCartController);

router.get('/', getAllCartsController)

router.post("/:id/products", addProductsController);

router.get("/:id/products", getProductsController);

router.get("/:id", getCartController)

router.delete("/:id", deleteCartController)

router.delete("/:id/products/:id_prod", deleteProductCartController)

export default router;