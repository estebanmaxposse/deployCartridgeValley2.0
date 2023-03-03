import { errorLog } from "../utils/logger.js";
import { getUser, loginUser, signUpUser, logout } from "../services/sessionsServices.js";

const getUserController = async (req, res) => {
    console.log(req.user);
    // const {id} = req.user
    let query = await getUser(req.params.id)
    if (query.status === 200) {
        res.status(query.status).json(query.response)
    } else {
        res.status(query.status).json(query.response)
    }
}

const loginUserController = async (req, res) => {
    // if (req.isAuthenticated()) {
    //     let user = await loginUser(req.body)
    //     res.status(user.status).json().redirect('/')
    // } else {
    //     res.redirect('/pages/login.html')
    // }
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

const logoutController = async (req, res) => {
    try {
        let user = await logout(req.user)
        console.log('LOGOUT: ', user);
        res.status(user.status).redirect('/')
    } catch (error) {
        errorLog(error, "Couldn't log out!")
    }
}

export { getUserController, loginUserController, signUpUserController, logoutController }
