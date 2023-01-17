import productValidation from "../utils/validator.js";
import Product from "../models/product.js";
import productManager from "../daos/daoProducts.js";
import mockProducts from "../utils/mockProducts.js";
import { errorLog } from "../utils/logger.js";

const generateProducts = new mockProducts()

const admin = true;

const checkAdmin = () => admin;

const getProducts = async () => {
    try {
        const products = await productManager.getAll();
        const productExists = products.length !== 0;
        if (productExists) {
            return products
        } else {
            return { error: "Couldn't find any products!" }
        }
    } catch (error) {
        errorLog(error)
    };
}

const getRandomProducts = async () => {
    const RandomProducts = generateProducts.populate();
    return RandomProducts
}

const getProduct = async (id) => {
    try {
        const product = await productManager.getById(id);
        let productExists = true;
        if (!product) {
            productExists = false;
        };
        if (productExists) {
             return product;
        } else {
            errorLog("Couldn't find the specified product!")
            return { error: "Couldn't find the specified product!" }
        }
    } catch (error) {
        errorLog(error)
    };
}

const postProduct = async () => {
    if (!checkAdmin()) {
        return {response: "You can not access this page"}
    }
    try {
        const { title, price, description, code, thumbnail, stock, category } = req.body;
        const newProduct = new Product(title, description, code, thumbnail, price, stock, category);
        const validatedProduct = productValidation(newProduct.title, newProduct.price, newProduct.description, newProduct.code, newProduct.thumbnail, newProduct.stock, newProduct.timestamp, newProduct.category);
        if (validatedProduct.error) {
            return validatedProduct;
        } else {
            const product = await productManager.save(validatedProduct);
            return validatedProduct;
        }
    } catch (error) {
        errorLog(error)
    };
}

const updateProduct = async (id, product) => {
    if (!checkAdmin()) {
        return {response: "You can not access this page"}
    }
    try {
        let updatedProduct = {...product, id: id};
        await productManager.updateItem(updatedProduct);
        return updatedProduct
    } catch (error) {
        errorLog(error)
    };
}

const deleteProduct = async (id) => {
    if (!checkAdmin()) {
        return {response: "You can not access this page"}
    }
    try { 
         return await productManager.deleteById(id)
    } catch (error) {
        errorLog(error)
    };
}

export { getProducts, getRandomProducts, getProduct, postProduct, updateProduct, deleteProduct }