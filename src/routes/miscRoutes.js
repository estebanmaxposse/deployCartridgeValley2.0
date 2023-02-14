import { Router } from "express";
const miscRouter = Router();
import { getInfoController, notFound404 } from "../controllers/miscController.js";

miscRouter.get('/info', getInfoController)

const errorRouter = Router()
errorRouter.get('*', notFound404)

export {miscRouter, errorRouter}