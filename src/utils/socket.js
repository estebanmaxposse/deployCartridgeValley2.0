import messageManager from '../daos/daoMessages.js';
import productManager from '../daos/daoProducts.js';
import productDTO from '../daos/dtos/dtoProducts.js';
import messageDTO from '../daos/dtos/dtoMessages.js';
import { getProducts } from '../services/productServices.js';
import { log } from './logger.js';

const getMessages = async () => {
        const rawMessages = await messageManager.getAll()
        const messages = rawMessages.map(m => new messageDTO(m))
        return messages
}

const socketConfig = async (io, socket) => {
    socket.emit('products', await getProducts());
    socket.emit('messages', await getMessages())

    socket.on('new-product', async data => {
        const product = new productDTO(data)
        await productManager.save(product);
        io.sockets.emit('products', await getProducts());
    });

    socket.on('new-message', async data => {
        data.date = new Date().toLocaleString();
        log(data);
        const message = new messageDTO(data)
        await messageManager.save(message);
        io.sockets.emit('messages', await getMessages());
    })
}

export default socketConfig