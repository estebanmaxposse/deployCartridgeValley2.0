import Order from "../models/order.js";
import orderDTO from "../daos/dtos/dtoOrders.js";
import orderManager from "../daos/daoOrders.js";
import { mailPurchaseToAdmin, mailPurchaseToUser } from "../utils/nodemailer.js";
import { errorLog } from "../utils/logger.js";
import cartManager from "../daos/daoCarts.js";
import userManager from "../daos/daoUsers.js";
import { getProducts, clearCart } from "./cartServices.js";

const getNewOrder = async (id, {user}) => {
    try {
        let cart = await cartManager.getById(id);
        if (!cart) return { response: "Cart not found", status: 404 };
        if (cart.cartTotalProducts === 0) return { response: "Cart is empty. Add some products first", status: 400 };
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
        return { response: savedOrder, status: 201 };
    } catch (error) {
        errorLog(error);
        return { response: "Couldn't create order", status: 500 };
    }
}

const getAllOrders = async () => {
    try {
        const rawOrders = await orderManager.getAll();
        if (!rawOrders) return { response: "No orders found", status: 404 };
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
        if (!order) return { response: "Order not found", status: 404 };
        return { response: order, status: 200 };
    } catch (error) {
        errorLog(error);
        return { response: "Couldn't fetch order", status: 500 };
    }
}

const getOrdersByUser = async (id) => {
    try {
        let orders = await orderManager.getByParameter({ buyerID: id });
        if (!orders) return { response: "Orders not found", status: 404 };
        return { response: orders, status: 200 };
    } catch (error) {
        errorLog(error);
        return { response: "Couldn't fetch orders", status: 500 };
    }
}

const updateOrder = async (id, body) => {
    try {
        let order = await orderManager.getById(id);
        if (!order) return { response: "Order not found", status: 404 };
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
        if (!order) return { response: "Order not found", status: 404 };
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
        mailPurchaseToAdmin(buyer, order)
        mailPurchaseToUser(order)
        return { response: "Order sent!", status: 201 }
    } catch (error) {
        errorLog(error)
        return { response: "Error completing purchase!", status: 500 }
    }
}

export { getNewOrder, getAllOrders, getOrder, updateOrder, deleteOrder, getOrdersByUser }