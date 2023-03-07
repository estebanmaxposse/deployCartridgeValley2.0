import { Router } from "express";
const router = Router();
import { getAllMessagesController, getMessagesByUserEmailController } from "../controllers/chatController.js";

router.get('/', getAllMessagesController)

router.get('/:email', getMessagesByUserEmailController)

export default router;