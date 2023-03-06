import messagesRepo from '../daos/repos/messagesRepo.js';

const messagesRepository = new messagesRepo()

const socketConfig = async (io, socket) => {

    // socket.emit('messages', () => {
    //     console.log(messagesRepository.getMessages())
    //     return messagesRepository.getMessages()
    // })

    socket.on('new-message', async data => {
        console.log('SOCKET DATA' , data)
        data.date = new Date().toLocaleString()
        await messagesRepository.saveMessage(data)
        io.sockets.emit('messages', await messagesRepository.getMessages())
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
}

export default socketConfig