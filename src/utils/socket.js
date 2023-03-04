import messagesRepo from '../daos/repos/messagesRepo.js';

const messagesRepository = new messagesRepo()

const socketConfig = async (io, socket) => {
    socket.emit('messages', await messagesRepository.getMessages())

    socket.on('new-message', async data => {
        console.log('SOCKET DATA' , data)
        data.date = new Date().toLocaleString()
        await messagesRepository.saveMessage(data)
        io.sockets.emit('messages', await messagesRepository.getMessages())
    })
}

export default socketConfig