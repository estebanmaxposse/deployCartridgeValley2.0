import config from '../config/globalConfig.js';
import express, { json, urlencoded, static as staticFiles } from 'express';
import { Server as HttpServer } from 'http'; 
import { Server as IOServer } from 'socket.io';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productRouter from '../routes/productRoutes.js';
import cartRouter from '../routes/cartRoutes.js'
import sessionRouter from '../routes/sessionRoutes.js';
import {miscRouter, errorRouter} from '../routes/miscRoutes.js'
import forkRouter from '../utils/serverFork.js'
import socketConfig from '../utils/socket.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import compression from  'compression'
import { routeLog, invalidRouteLog, log } from '../utils/logger.js';
import serverConfig from '../config/serverConfig.js';
import cors from 'cors'

// import { normalizeMessage } from '../controllers/dataNormalizer.js';

const PORT = config.PORT;
log(PORT);
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)
app.use(cors())

//Session Manager
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGOATLAS_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: config.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

//Views Engine
app.set('view engine', 'pug');
app.set('views', join(__dirname, '../../views'));

app.use(json());
app.use(urlencoded({ extended: true}));
app.use(staticFiles(join(__dirname, '../../public')));
app.use(cookieParser());

//Routes
app.use(compression(), routeLog, productRouter);
app.use('/api/auth', compression(), routeLog, sessionRouter);
app.use(compression(), routeLog, miscRouter)
app.use(compression(), routeLog, forkRouter)
app.use('/api/cart', compression(), routeLog, cartRouter);

app.use(invalidRouteLog, errorRouter);

const startServer = () => serverConfig(httpServer, PORT)

io.on('connection', async (socket) => socketConfig(io, socket))

export default startServer;