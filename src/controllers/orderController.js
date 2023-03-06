import { getNewOrder, getAllOrders, getOrder, updateOrder, deleteOrder, getOrdersByUser } from '../services/orderServices.js';
import { errorLog } from '../utils/logger.js';

const getNewOrderController = async (req, res) => {
    try {
        const query = await getNewOrder(req.params.id, req.user)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error);
    }
}

const getAllOrdersController = async (req, res) => {
    try {
        const query = await getAllOrders()
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error);
    }
}

const getOrderController = async (req, res) => {
    let { id } = req.params;
    try {
        const query = await getOrder(id)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error)
    }
}

const getOrdersByUserController = async (req, res) => {
    let { id } = req.params;
    try {
        const query = await getOrdersByUser(id)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error)
    }
}

const updateOrderController = async (req, res) => {
    let { id } = req.params;
    try {
        const query = await updateOrder(id, req.body)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error)
    }
}

const deleteOrderController = async (req, res) => {
    let { id } = req.params;
    try {
        const query = await deleteOrder(id)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error)
    }
}

export { getNewOrderController, getAllOrdersController, getOrderController, updateOrderController, deleteOrderController, getOrdersByUserController }