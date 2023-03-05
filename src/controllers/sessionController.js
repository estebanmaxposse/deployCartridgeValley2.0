import { errorLog } from "../utils/logger.js";
import { getUser, loginUser, signUpUser, updateUser } from "../services/sessionsServices.js";

const getUserController = async (req, res) => {
    console.log('Get user controller ', req.user);
    // const {id} = req.user
    let query = await getUser(req.user.user._id)
    if (query.status === 200) {
        res.status(query.status).json(query.response)
    } else {
        res.status(query.status).json(query.response)
    }
}

const loginUserController = async (req, res) => {
    let user = await loginUser(req.body)
    if (user.status === 200) {
        res.status(user.status).json(user.response)
    } else {
        res.status(user.status).json(user.response)
    }
}

const signUpUserController = async (req, res) => {
    let user = await signUpUser(req.body)
    if (user.status === 200) {
        res.status(user.status).json(user.response)
    } else {
        res.status(user.status).json(user.response)
    }
}

const updateUserController = async (req, res) => {
    try {
        console.log('UPDATE: ', req.body);
        let user = await updateUser(req.body)
        res.status(user.status).json(user.response)
    } catch (error) {
        errorLog(error, "Couldn't update user!")
    }
}


export { getUserController, loginUserController, signUpUserController, updateUserController }
