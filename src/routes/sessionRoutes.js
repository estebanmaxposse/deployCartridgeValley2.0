import { Router } from "express";
const entryRoutes = Router();
const sessionRouter = Router();
import { getUserController, loginUserController, signUpUserController, logoutController } from '../controllers/sessionController.js'

entryRoutes.post('/login', loginUserController)

entryRoutes.post('/signUp', signUpUserController)

sessionRouter.get('/user', getUserController)

sessionRouter.post('/logout', logoutController)

export { entryRoutes, sessionRouter };