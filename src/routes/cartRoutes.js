import { Router } from "express";
import Cart from '../models/cart.js'
const router = Router();
import dbManager from '../utils/mongoManager.js';

const productManager = new dbManager('products');
const cartManager = new dbManager('cart');

router.post("/", async (req, res) => {
    try {
        let newCart = new Cart()
        console.log('USER: ', req.session.user);
        newCart.buyerID = req.user._id
        console.log(newCart.buyerID);
        res.status(200).json(await cartManager.save(newCart))
    } catch (error) {
        throw new Error(error);
    };
});

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await cartManager.getAll())
    } catch (error) {
        throw new Error(error);
    }
})

router.post("/:id/products", async (req, res) => {
    let { id } = req.params;
    let cart = await cartManager.getById(id);
    let body = req.body;
    await Promise
        .all(body.map(pId => {
            return productManager.getById(pId._id)}))
        .then(products => {
            cart.products.push(...products)});

    let updatedCart = await cartManager.updateItem(cart);
    res.json(updatedCart.response);
});

router.get("/:id/products", async (req, res) => {
    let { id } = req.params;
    let cart = await cartManager.getById(id);
    if (cart.products.length === 0) {
        res.json({ response: "This cart has no products" })
    } else {
        res.status(200).json({cartId: cart._id, products: cart.products, buyerID: cart.buyerID})
    };
});

router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    res.status(200).json( await cartManager.deleteById(id) );
})

router.delete("/:id/products/:id_prod", async (req, res) => {
    let { id, id_prod } = req.params;
    let cart = await cartManager.getById(id);
    let newProducts = cart.products.filter((product) => (product._id).toString() !== id_prod);
    cart.products = newProducts;

    let updatedCart = await cartManager.updateItem(cart);
    res.status(200).json(updatedCart.response);
})

export default router;