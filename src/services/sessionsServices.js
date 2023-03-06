import { errorLog } from "../utils/logger.js";
import { mailUser } from '../utils/nodemailer.js'
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
    if (!token) {
        res.status(401).json('Access denied');
    }
    try {
        const decoded = verify(token, config.SESSION_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        errorLog(error)
        req.user = null
        res.status(401).json('Access denied');
    }
};

const getUser = async (id) => {
    console.log('GET USER ID: ', id);
    try {
        let userDB = await userManager.getById(id)
        console.log('GET USER: ', userDB);
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
        console.log(config.SESSION_TIME)
        const { email, password } = userCredentials
        const userExists = await userManager.getUserByEmail(email)
        if (userExists) {
            const user = new userDTO(userExists)
            if (isValidPassword(user, password)) {
                const token = sign( {user} , config.SESSION_KEY, { expiresIn: config.SESSION_TIME })
                console.log('LOGIN TOKEN ', {token});
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
        // const userExists = await userManager.getUserByEmail(email)
        const userExists = null
        if (userExists) {
            return { response: 'User already exists', status: 409 }
        } else {
            const user = new userDTO(userCredentials)
            console.log('NEW USER: ', user);
            const newUser = await userManager.save(user)
            const token = sign({ user }, config.SESSION_KEY, { expiresIn: config.SESSION_TIME })
            console.log('SIGN UP TOKEN: ', token);
            return { response: token, status: 200 }
        }
    } catch (error) {
        errorLog(error)
        return { response: "Couldn't sign up!", status: 500 }
    }
}

const updateUser = async (userCredentials) => {
    try {
        console.log('UPDATE USER: ', userCredentials.user);
        const updateUser = await userManager.updateItem(userCredentials.user)
        return { response: updateUser, status: 200 }
    } catch (error) {
        errorLog(error)
        return { response: error, status: 500 }
    }
}

export { getUser, loginUser, signUpUser, verifyToken, updateUser }