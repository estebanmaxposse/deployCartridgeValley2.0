import messagesRepo from "../daos/repos/messagesRepo.js";
import { errorLog } from "../utils/logger.js";

const messagesRepository = new messagesRepo();

const getAllMessages = async (req, res) => {
    try {
        const messages = await messagesRepository.getMessages();
        if (!messages || messages.length === 0) {
            return { response: "No messages found", status: 404 }
        }
        return { response: messages, status: 200 }
    } catch (e) {
        errorLog(e);
        return { response: "Couldn't fetch messages", status: 500 }
    }
}

const getMessagesByUserEmail = async (email) => {
    try {
        const messages = await messagesRepository.getMessagesByParameter({senderEmail: email});
        if (!messages || messages.length === 0) {
            return { response: "No messages found for this user", status: 404 }
        }
        return { response: messages, status: 200 }
    } catch (e) {
        errorLog(e);
        return { response: "Couldn't fetch messages", status: 500 }
    }
}

export { getAllMessages, getMessagesByUserEmail };