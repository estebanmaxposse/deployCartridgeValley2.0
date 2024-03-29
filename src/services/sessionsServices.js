import { errorLog, log } from "../utils/logger.js";
import { mailAdmin } from '../utils/nodemailer.js'
import userDTO from "../daos/dtos/dtoUsers.js";
import Jwt from "jsonwebtoken";
import userManager from "../daos/daoUsers.js";
const { sign, verify } = Jwt
import config from '../config/globalConfig.js'
import createHash from "../utils/hashGenerator.js";
import isValidPassword from "../utils/passwordValidator.js";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    log('TOKEN FOR TESTING: ')
    log(token)
    try {
        const decoded = verify(token, config.SESSION_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        errorLog(error)
        if (error.name === 'TokenExpiredError') {
            res.status(401).json('Token expired, please log in again');
        }
        if (error.name === 'JsonWebTokenError') {
            if (error.message === 'invalid signature') {
                return res.status(401).json('Invalid signature. Either the token has been tampered with or the secret key was modified after the token was issued. Please log in again or restart the application to generate a new token');
            }
            if (error.message === 'invalid token') {
                return res.status(401).json("The token's header or payload could not be parsed, please log in again");
            }
            if (error.message === 'jwt must be provided') {
                return res.status(401).json('No token provided. Please log in again');
            }
            if (error.message === 'jwt malformed') {
                return res.status(401).json('The token is malformed, it does not have three components, please log in again');
            } else {
                return res.status(401).json('Invalid token, please log in again');
            }
        }
        req.user = null
        res.status(401);
    }
};

const getUser = async (id) => {
    try {
        let userDB = await userManager.getById(id)
        if (userDB) {
            const user = new userDTO(userDB)
            return { response: user, status: 200 }
        } else {
            return { response: 'User not found', status: 404 }
        }
    } catch (error) {
        errorLog(error)
    }
}

const loginUser = async (userCredentials) => {
    try {
        const { email, password } = userCredentials
        const userExists = await userManager.getUserByEmail(email)
        if (userExists) {
            const user = new userDTO(userExists)
            if (isValidPassword(user, password)) {
                const token = sign({ user }, config.SESSION_KEY, { expiresIn: config.SESSION_TIME })
                return { response: token, status: 200 }
            } else {
                return { response: 'Invalid password', status: 401 }
            }
        } else {
            return { response: 'User not found', status: 404 }
        }
    } catch (error) {
        errorLog(error)
        return { response: "Couldn't log in!", status: 500 }
    }
}

const signUpUser = async (userCredentials) => {
    try {
        const { email, password } = userCredentials
        userCredentials.password = createHash(password)
        const userExists = await userManager.getUserByEmail(email)
        if (userExists) {
            return { response: 'User already exists', status: 409 }
        } else {
            const user = new userDTO(userCredentials)
            mailAdmin(user)
            const newUser = await userManager.save(user)
            user._id = newUser
            const token = sign({ user }, config.SESSION_KEY, { expiresIn: config.SESSION_TIME })
            log('SIGNUP TOKEN FOR TESTING ', token);
            return { response: token, status: 200 }
        }
    } catch (error) {
        errorLog(error)
        return { response: "Couldn't sign up!", status: 500 }
    }
}

const updateUser = async (userUpdateData, userID) => {
    try {
        const userDB = await userManager.getById(userID)
        if (userDB) {
            const user = new userDTO(userDB)
            const newUser = { ...user, ...userUpdateData }
            const updateUser = await userManager.updateItem(newUser)
            return { response: updateUser, status: 200 }           
        } else {
            return { response: 'User not found', status: 404 }
        }
    } catch (error) {
        errorLog(error)
        return { response: error, status: 500 }
    }
}

export { getUser, loginUser, signUpUser, verifyToken, updateUser }