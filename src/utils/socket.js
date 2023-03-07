import messagesRepo from '../daos/repos/messagesRepo.js';

const messagesRepository = new messagesRepo()

const socketConfig = async (io, socket) => {

    socket.on('new-message', async data => {
        data.date = new Date().toLocaleString()
        let savedMessage = await messagesRepository.saveMessage(data)
        io.sockets.emit('messages', await messagesRepository.getMessages())
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
}

export default socketConfig