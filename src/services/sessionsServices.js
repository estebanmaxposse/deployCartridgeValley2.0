import { errorLog, log } from "../utils/logger.js";
import { mailUser } from '../utils/nodemailer.js'

let user

const getSession = async (sessionViews) => {
    try {
        sessionViews ? sessionViews + 1 : 1
        return (`<h1>Views: ${sessionViews} </h1>`)
    } catch (error) {
        errorLog(error)
    }
}

const getUser = async (userCheck) => {
    try {
        if (userCheck) {
            user = userCheck
            return { response: user, status: 200 }
        } else {
            return { response: 'User not found', status: 404 }
        }
    } catch (error) {
        errorLog(error)
    }
}

const loginUser = async (userCheck) => {
    try {
        user = userCheck
        log(`${user} is logged in`)
    } catch (error) {
        errorLog(error)
    }
}

const authLogin = async () => {
    return
}

const loginFailed = async () => {
    log('Login failed');
}

const signUpUser = async (userCheck) => {
    try {
        user = userCheck
        log(`${user} is logged in`)
    } catch (error) {
        errorLog(error)
    }
}

const authSignUp = async (userCheck) => {
    try {
        let user = userCheck
        mailUser(user)
    } catch (error) {
        errorLog(error)
    }
}

const signUpFailed = async () => {
    log('Sign up failed');
}


const logout = async (userCheck) => {
    try {
        let user = userCheck
        log("LOGOUT", user);
        return user
    } catch (error) {
        errorLog(error)
    }
}

export { getSession, getUser, loginUser, authLogin, loginFailed, signUpUser, authSignUp, signUpFailed, logout }

export { user }