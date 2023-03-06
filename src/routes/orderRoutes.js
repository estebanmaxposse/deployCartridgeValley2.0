import { Router } from "express";
const router = Router();
import { getNewOrderController, getAllOrdersController, getOrderController, updateOrderController, deleteOrderController, getOrdersByUserController } from '../controllers/orderController.js'

router.post("/:id", getNewOrderController);

router.get('/', getAllOrdersController);

router.get("/:id", getOrderController);

router.get("/user/:id", getOrdersByUserController);

router.put("/:id", updateOrderController);

router.delete("/:id", deleteOrderController);

export default router;