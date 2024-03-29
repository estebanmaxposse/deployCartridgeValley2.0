import config from '../config/globalConfig.js';
import express, { json, urlencoded, static as staticFiles } from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productRouter from '../routes/productRoutes.js';
import cartRouter from '../routes/cartRoutes.js'
import { entryRoutes, sessionRouter } from '../routes/sessionRoutes.js';
import { verifyToken } from '../services/sessionsServices.js';
import orderRouter from '../routes/orderRoutes.js';
import { miscRouter, errorRouter, docsRouter } from '../routes/miscRoutes.js'
import chatRouter from '../routes/chatRoutes.js'
import messagesRepo from '../daos/repos/messagesRepo.js';
import cookieParser from 'cookie-parser';
import compression from 'compression'
import { routeLog, invalidRouteLog, log } from '../utils/logger.js';
import socketConfig from '../utils/socket.js';
import serverConfig from '../config/serverConfig.js';
import cors from 'cors'

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

//Views Engine
app.set('view engine', 'pug');
app.set('views', join(__dirname, '../../views'));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(staticFiles(join(__dirname, '../../public')));
app.use(cookieParser());

//Routes
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/api/auth', compression(), routeLog, entryRoutes)
app.use(routeLog, docsRouter)
app.use(compression(), routeLog, miscRouter)

//Protected Routes
app.use(verifyToken)
app.use(compression(), routeLog, productRouter);
app.use('/api/auth', compression(), routeLog, sessionRouter);
app.use('/api/cart', compression(), routeLog, cartRouter);
app.use('/api/order', compression(), routeLog, orderRouter);
app.use('/api/chat', compression(), routeLog, chatRouter);

app.use(invalidRouteLog, errorRouter);

const startServer = () => serverConfig(httpServer, PORT)

//CHAT SOCKET
const messagesRepository = new messagesRepo()
io.on('connection', async (socket) => {
    log('Client connected');
    socket.emit('load-messages', await messagesRepository.getMessages())
    return await socketConfig(io, socket);
})

export default startServer;