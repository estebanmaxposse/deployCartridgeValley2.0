// import { Server as IOServer } from 'socket.io';
// import { httpServer } from '../models/server.js';
// import messagesRepo from '../daos/repos/messagesRepo.js';
// import { log } from '../utils/logger.js';

// console.log(httpServer)
// const io = new IOServer(httpServer)

// const getChatController = async (req, res) => {
//     const user = req.user
//     const messagesRepository = new messagesRepo()

//     const socketConfig = async (io, socket) => {
//         socket.emit('messages', await messagesRepository.getMessages())

//         socket.on('new-message', async data => {
//             data.date = new Date().toLocaleString();
//             data.senderID = user_id;
//             data.author = {
//                 name: user.username,
//                 avatar: user.avatar,
//             }
//             data.admin = user.admin
//             log(data);
//             await messagesRepository.saveMessage(data)
//             io.sockets.emit('messages', await messagesRepository.getMessages());
//         })
//     }
//     io.on('connection', async (socket) => socketConfig(io, socket))
// }

// export default getChatController
