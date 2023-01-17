import { getNewCart, getAllCarts, addProducts, getProducts, getCart, completePurchase, deleteCart, deleteProduct } from '../services/cartServices.js'
import { errorLog } from '../utils/logger.js';

const getNewCartController = async (req, res) => {
    try {
        res.json(await getNewCart())
    } catch (error) {
        errorLog(error);
    }
}

const getAllCartsController  = async (req, res) => {
    try {
        res.json(await getAllCarts())
    } catch (error) {
        errorLog(error);
    }
}

const addProductsController = async (req, res) => {
    const { id } = req.params
    try {
        const updatedCart = await addProducts(id, req.body)
        res.json(updatedCart)
    } catch (error) {
        errorLog(error);
    }
}

const getProductsController = async (req, res) => {
    let { id } = req.params;
    try {
        const productsCart = await getProducts(id)
        res.json(productsCart)
    } catch (error) {
        errorLog(error)
    }
}

const getCartController = async (req, res) => {
    let { id } = req.params;
    try {
        let cart = await getCart(id)
        res.json(cart)
    } catch (error) {
        errorLog(error)
    }
}

const completePurchaseController = async (req, res) => {
    let { id } = req.params;
    try {
        const purchase = await completePurchase(id)
        res.json(purchase)
    } catch (error) {
        errorLog(error)
    }
}

const deleteCartController = async (req, res) => {
    let { id } = req.params;
    try {
        req.json(await deleteCart(id))
    } catch (error) {
        errorLog(error)
    }
}

const deleteProductCartController = async (req, res) => {
    let { id, id_prod } = req.params;
    try {
        res.json(await deleteProduct(id, id_prod))
    } catch (error) {
        errorLog(error)
    }
}

export { getNewCartController, getAllCartsController, addProductsController, getProductsController, getCartController, completePurchaseController, deleteCartController, deleteProductCartController }