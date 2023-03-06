import config from '../config/globalConfig.js';
import express, { json, urlencoded, static as staticFiles } from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { verifyToken } from '../services/sessionsServices.js';
import productRouter from '../routes/productRoutes.js';
import cartRouter from '../routes/cartRoutes.js'
import { entryRoutes, sessionRouter } from '../routes/sessionRoutes.js';
import orderRouter from '../routes/orderRoutes.js';
import { miscRouter, errorRouter, docsRouter } from '../routes/miscRoutes.js'
import chatRouter from '../routes/chatRoutes.js'
import messagesRepo from '../daos/repos/messagesRepo.js';
import forkRouter from '../utils/serverFork.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import compression from 'compression'
import { routeLog, invalidRouteLog, log } from '../utils/logger.js';
import socketConfig from '../utils/socket.js';
import serverConfig from '../config/serverConfig.js';
import cors from 'cors'

// import { normalizeMessage } from '../controllers/dataNormalizer.js';

const PORT = config.PORT;
log(PORT);
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors())
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer, {
    cors: {
        origin: config.FRONTEND_URL || 'http://localhost:3000',
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true,
    },
    allowEIO3: true
})

io.engine.on("connection_error", (err) => {
    console.log(err.message);  // the error message, for example "Session ID unknown"
  });

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

//Views Engine
app.set('view engine', 'pug');
app.set('views', join(__dirname, '../../views'));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(staticFiles(join(__dirname, '../../public')));
app.use(cookieParser());

//Routes
app.use('/api/auth', compression(), routeLog, entryRoutes)
app.use(verifyToken)
app.use(compression(), routeLog, productRouter);
app.use('/api/auth', compression(), routeLog, sessionRouter);
app.use(compression(), routeLog, miscRouter)
app.use(docsRouter)
app.use(compression(), routeLog, forkRouter)
app.use('/api/cart', compression(), routeLog, cartRouter);
app.use('/api/order', compression(), routeLog, orderRouter);
app.use('/api/chat', compression(), routeLog, chatRouter);

app.use(invalidRouteLog, errorRouter);

const startServer = () => serverConfig(httpServer, PORT)

const messagesRepository = new messagesRepo()
io.on('connection', async (socket) => {
    console.log('Client connected');
    socket.emit('load-messages', await messagesRepository.getMessages())
    return await socketConfig(io, socket)
})

export default startServer;