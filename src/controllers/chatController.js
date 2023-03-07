import { errorLog } from '../utils/logger.js';
import { getMessagesByUserEmail, getAllMessages } from '../services/chatServices.js';

const getAllMessagesController = async (req, res) => {
    try {
        const query = await getAllMessages()
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error);
    }
}

const getMessagesByUserEmailController = async (req, res) => {
    let { email } = req.params;
    try {
        let query = await getMessagesByUserEmail(email)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error)
    }
}

export { getAllMessagesController, getMessagesByUserEmailController };