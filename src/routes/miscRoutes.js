import { Router } from "express";
import SwaggerUI from 'swagger-ui-express'
import { getInfoController, notFound404 } from "../controllers/miscController.js";
import swaggerDocs from "../utils/swaggerConfig.js";

const miscRouter = Router();
miscRouter.get('/info', getInfoController)

const errorRouter = Router()
errorRouter.get('*', notFound404)

const docsRouter = Router()
docsRouter.use('/api-docs', SwaggerUI.serve)
docsRouter.get('/api-docs', SwaggerUI.setup(swaggerDocs))

export {miscRouter, errorRouter, docsRouter}