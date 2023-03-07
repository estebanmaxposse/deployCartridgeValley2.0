import * as dotenv from 'dotenv'
import path from 'path'

const dotEnvProduction = ".env.production";
const dotEnvDevelopment = ".env.development";

dotenv.config({
    path: path.resolve(process.cwd(), dotEnvDevelopment)
})

export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || '8080',
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8080',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    DATABASE: process.env.DATABASE || 'mongo',
    SESSION_TIME: process.env.SESSION_TIME || '30m',
    MONGOATLAS_URL: process.env.MONGOATLAS_URL || 'mongodb+srv://estebanmaxposse:GetStuff8@ecommerce.qwzmjs0.mongodb.net/?retryWrites=true&w=majority',
    SERVER_MODE: process.env.SERVER_MODE || 'fork',
    SENT_MAIL: process.env.SENT_MAIL || 'estebanposse98@gmail.com',
    RECIEVE_MAIL: process.env.RECIEVE_MAIL || 'estebanmaxposse@hotmail.com',
}