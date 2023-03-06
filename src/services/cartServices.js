import Cart from '../models/cart.js'
import cartManager from '../daos/daoCarts.js';
import productManager from '../daos/daoProducts.js';
import { errorLog } from '../utils/logger.js';
import cartDTO from '../daos/dtos/dtoCarts.js';
import { productCounter, totalCounter } from '../utils/productCounter.js';

const getNewCart = async ({user}) => {
    let newCart = new Cart()
    newCart.buyerID = user._id
    newCart.buyerEmail = user.email
    newCart.buyerShippingAddress = user.shippingAddress
    let cart = new cartDTO(newCart)
    try {
        let savedCart = await cartManager.save(cart)
        return { response: savedCart, status: 201 }
    } catch (error) {
        errorLog(error);
        return { response: "Couldn't create cart", status: 500 }
    }
}

const getAllCarts = async () => {
    try {
        const rawCarts = await cartManager.getAll()
        const carts = rawCarts.map(c => new cartDTO(c))
        return { response: carts, status: 200 }
    } catch (error) {
        errorLog(error)
        return { response: "Couldn't fetch carts", status: 500 }
    }
}

const addProducts = async (id, products) => {
    try {
        let cart = await cartManager.getById(id);
        let body = products;
        await Promise
            .all(body.map(pId => {
                return productManager.getById(pId._id)
            }))
            .then(products => {
                let totalProducts = productCounter(products, cart)
                cart.products = totalProducts

                let totalAmounts = totalCounter(totalProducts)
                cart.cartTotalProducts = totalAmounts.totalCount
                cart.cartTotalPrice = totalAmounts.totalPrice
            });

        let updatedCart = await cartManager.updateItem(cart);
        return { response: 'Cart updated!', status: 201 }
    } catch (error) {
        errorLog(error)
        return { response: "Couldn't update cart", status: 500 }
    }
}

const getProducts = async (id) => {
    try {
        let rawCart = await cartManager.getById(id);
        let cart = new cartDTO(rawCart)
        if (cart.products.length === 0) {
            return { response: "This cart has no products", status: 200 }
        } else {
            let cartProducts = await Promise.all(cart.products.map(async p => {
                return {
                    product: await productManager.getById(p._id),
                    quantity: p.count,
                    subtotal: p.totalPrice
                }
            }))
            return {
                response: {
                    cartId: cart._id,
                    products: cartProducts,
                    buyerID: cart.buyerID,
                    cartLength: cart.cartTotalProducts,
                    total: cart.cartTotalPrice
                },
                status: 200
            }
        }
    } catch (error) {
        errorLog(error)
        return { response: "Couldn't fetch cart", status: 500 }
    }
}

const getCart = async (id) => {
    try {
        let rawCart = await cartManager.getById(id)
        if (!rawCart) {
            return { response: "Couldn't find cart!", status: 404 }
        } else {
            let cart = new cartDTO(rawCart)
            return { response: cart, status: 200 }
        }
    } catch (error) {
        errorLog(error)
        return { response: "Error fetching cart!", status: 500 }
    }
}

const getCartByUserID = async (userID) => {
    try {
        let rawCart = await cartManager.getByParameter({buyerID: userID})
        if (!rawCart) {
            return { response: "Couldn't find cart!", status: 404 }
        } else {
            let cart = new cartDTO(rawCart[0])
            return { response: cart, status: 200 }
        }
    } catch (error) {
        errorLog(error)
        return { response: "Error fetching cart!", status: 500 }
    }
}

const deleteCart = async (id) => {
    try {
        await cartManager.deleteById(id)
        return { response: 'Cart deleted', status: 201 }
    } catch (error) {
        errorLog(error)
        return { response: "Error deleting cart!", status: 500 }
    }
}

const deleteProduct = async (id, id_prod) => {
    try {
        let cart = await cartManager.getById(id);
        let newProducts = cart.products.filter((product) => (product._id).toString() !== id_prod);
        cart.products = newProducts;
        let totalAmounts = totalCounter(cart.products)
        cart.cartTotalProducts = totalAmounts.totalCount
        cart.cartTotalPrice = totalAmounts.totalPrice
        let updatedCart = await cartManager.updateItem(cart);
        return { response: `Removed product with ID: ${id_prod} from cart ${id}`, status: 201 }
    } catch (error) {
        errorLog(error)
        return { response: "Couldn't update cart", status: 500 }
    }
}

const clearCart = async (id) => {
    try {
        let cart = await cartManager.getById(id);
        cart.products = [];
        cart.cartTotalProducts = 0;
        cart.totalPrice = 0
        let updatedCart = await cartManager.updateItem(cart);
        return { response: 'Cart updated!', status: 201 }
    } catch (error) {
        errorLog(error)
        return { response: "Couldn't update cart", status: 500 }
    }
}

export { getNewCart, getAllCarts, addProducts, getProducts, getCart, deleteCart, deleteProduct, clearCart, getCartByUserID }