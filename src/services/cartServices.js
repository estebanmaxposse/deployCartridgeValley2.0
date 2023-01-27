import Cart from '../models/cart.js'
import cartManager from '../daos/daoCarts.js';
import productManager from '../daos/daoProducts.js';
import userManager from '../daos/daoUsers.js';
import { user } from "../services/sessionsServices.js";
import { sendSMS, sendWpp } from "../utils/twilio.js";
import { mailPurchase } from "../utils/nodemailer.js";
import config from '../config/globalConfig.js'
import { errorLog } from '../utils/logger.js';
import cartDTO from '../daos/dtos/dtoCarts.js';

const getNewCart = async () => {
    let newCart = new Cart()
    newCart.buyerID = user._id
    let cart = new cartDTO(newCart)
    try {
        let savedCart = await cartManager.save(cart)
        return { response: 'Cart created!', status: 201 }
    } catch (error) {
        errorLog(error);
        return { response: "Couldn't create cart", status: 500 }
    }
}

const getAllCarts = async () => {
    try {
        const rawCarts = await cartManager.getAll()
        const carts = rawCarts.map(c => new cartDTO(c))
        return carts
    } catch (error) {
        errorLog(error)
    }
}

const addProducts = async (id, products) => {
    try {
        let cart = await cartManager.getById(id);
        let body = products;
        await Promise
            .all(body.map(pId => {
                return productManager.getById(pId._id)}))
            .then(products => {
                cart.products.push(...products)});
    
        let updatedCart = await cartManager.updateItem(cart);
        return updatedCart.response
    } catch (error) {
        errorLog(error)
    }
}

const getProducts = async (id) => {
    try {
        let cart = await cartManager.getById(id);
        if (cart.products.length === 0) {
            return { response: "This cart has no products" }
        } else {
            return { cartId: cart._id, products: cart.products, buyerID: cart.buyerID }
        }
    } catch (error) {
        errorLog(error)
    }
}

const getCart = async (id) => {
    try {
        let rawCart = await cartManager.getById(id)
        let cart = new cartDTO(rawCart)
        return cart
    } catch (error) {
        errorLog(error)
    }
}

const completePurchase = async (id) => {
    try {
        let cart = await cartManager.getById(id)
        let buyer = await userManager.getById(cart.buyerID)
        sendWpp(
            config.TEST_PHONE,
            `New purchase from ${buyer.fullName}
            with email ${buyer.email}.
            Products purchased:
            ${cart.products.map(product => product.title).join(', ')}
            `
        );
        sendSMS(
            buyer.phoneNumber, `Purchase completed! Your order is being processed.`
        )
        mailPurchase(buyer, cart)
        return { response: 'Purchase successful' }
    } catch (error) {
        errorLog(error)
    }
}

const deleteCart = async (id) => {
    try {
        await cartManager.deleteById(id)
        return { response: 'Cart deleted' }
    } catch (error) {
        errorLog(error)
    }
}

const deleteProduct = async (id, id_prod) => {
    try {
        let cart = await cartManager.getById(id);
        let newProducts = cart.products.filter((product) => (product._id).toString() !== id_prod);
        cart.products = newProducts;
    
        let updatedCart = await cartManager.updateItem(cart);
        return updatedCart.response
    } catch (error) {
        errorLog(error)
    }
}

export { getNewCart, getAllCarts, addProducts, getProducts, getCart, completePurchase, deleteCart, deleteProduct }