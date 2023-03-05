import { Router } from "express";
const entryRoutes = Router();
const sessionRouter = Router();
import { getUserController, loginUserController, signUpUserController, updateUserController } from '../controllers/sessionController.js'

entryRoutes.post('/login', loginUserController)

entryRoutes.post('/signUp', signUpUserController)

sessionRouter.get('/user', getUserController)

sessionRouter.put('/update', updateUserController)

export { entryRoutes, sessionRouter };