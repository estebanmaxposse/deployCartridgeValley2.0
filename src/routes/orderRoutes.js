import { Router } from "express";
const router = Router();
import { getNewOrderController, getAllOrdersController, getOrderController, updateOrderController, deleteOrderController } from '../controllers/orderController.js'

router.post("/:id", getNewOrderController);

router.get('/', getAllOrdersController);

router.get("/:id", getOrderController);

router.put("/:id", updateOrderController);

router.delete("/:id", deleteOrderController);

export default router;