import Order from "../models/order.js";
import orderDTO from "../daos/dtos/dtoOrders.js";
import orderManager from "../daos/daoOrders.js";
import { user } from "../services/sessionsServices.js";
import { sendSMS, sendWpp } from "../utils/twilio.js";
import { mailPurchaseToAdmin, mailPurchaseToUser } from "../utils/nodemailer.js";
import config from "../config/globalConfig.js";
import { errorLog } from "../utils/logger.js";
import cartManager from "../daos/daoCarts.js";
import userManager from "../daos/daoUsers.js";
import { getProducts, clearCart } from "./cartServices.js";

const getNewOrder = async (id) => {
    try {
        let cart = await cartManager.getById(id);
        let products = await getProducts(id);
        let newOrder = new Order();
        newOrder.orderNumber = await orderManager.getOrderNumber();
        newOrder.buyerID = user._id;
        newOrder.buyerEmail = user.email;
        newOrder.buyerShippingAddress = user.shippingAddress;
        newOrder.products = products.response.products;
        newOrder.orderTotalProducts = cart.cartTotalProducts;
        newOrder.orderTotalPrice = cart.cartTotalPrice;
        let order = new orderDTO(newOrder);
        let savedOrder = await orderManager.save(order);
        let sentOrder = await sendOrder(order)
        let clearedCart = await clearCart(id);
        return { response: "Order created!", status: 201 };
    } catch (error) {
        errorLog(error);
        return { response: "Couldn't create order", status: 500 };
    }
}

const getAllOrders = async () => {
    try {
        const rawOrders = await orderManager.getAll();
        const orders = rawOrders.map((o) => new orderDTO(o));
        return { response: orders, status: 200 };
    } catch (error) {
        errorLog(error);
        return { response: "Couldn't fetch orders", status: 500 };
    }
}

const getOrder = async (id) => {
    try {
        let order = await orderManager.getById(id);
        return { response: order, status: 200 };
    } catch (error) {
        errorLog(error);
        return { response: "Couldn't fetch order", status: 500 };
    }
}

const updateOrder = async (id, body) => {
    try {
        let order = await orderManager.getById(id);
        order.status = body.status;
        let updatedOrder = await orderManager.updateItem(order);
        return { response: "Order updated!", status: 201 };
    } catch (error) {
        errorLog(error);
        return { response: "Couldn't update order", status: 500 };
    }
}

const deleteOrder = async (id) => {
    try {
        let order = await orderManager.getById(id);
        let deletedOrder = await orderManager.deleteItem(order);
        return { response: "Order deleted!", status: 201 };
    } catch (error) {
        errorLog(error);
        return { response: "Couldn't delete order", status: 500 };
    }
}

const sendOrder = async (order) => {
    try {
        let buyer = await userManager.getById(order.buyerID);
        sendWpp(
            config.TEST_PHONE,
            `New purchase from ${buyer.fullName}
            with email ${buyer.email}.
            Products purchased:
            ${order.products.map(product => product.product.title).join(', ')}
            `
        );
        sendSMS(
            buyer.phoneNumber, `Purchase completed! Your order #${order.orderNumber} is being processed.`
        )
        mailPurchaseToAdmin(buyer, order)
        mailPurchaseToUser(order)
        return { response: "Order sent!", status: 201 }
    } catch (error) {
        errorLog(error)
        return { response: "Error completing purchase!", status: 500 }
    }
}

export { getNewOrder, getAllOrders, getOrder, updateOrder, deleteOrder }