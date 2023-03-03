import { Router } from "express";
const router = Router();
import getChatController from "../controllers/chatController";

router.get('/', getChatController)