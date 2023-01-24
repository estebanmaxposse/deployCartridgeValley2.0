import productValidation from "../utils/validator.js";
import Product from "../models/product.js";
import productManager from "../daos/daoProducts.js";
import productDTO from "../daos/dtos/dtoProducts.js";
import mockProducts from "../utils/mockProducts.js";
import { errorLog } from "../utils/logger.js";

const generateProducts = new mockProducts()

const admin = true;

const checkAdmin = () => admin;

const getProducts = async () => {
    try {
        const rawProducts = await productManager.getAll();
        const products = rawProducts.map(p => new productDTO(p))
        const productExists = products.length !== 0;
        if (productExists) {
            return products
        } else {
            return { response: "Couldn't find any products!", status: 404 }
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
        const rawProduct = await productManager.getById(id);
        const product = new productDTO(rawProduct)
        let productExists = true;
        if (!product) {
            productExists = false;
        };
        if (productExists) {
             return product;
        } else {
            return { response: "Couldn't find any products!", status: 404 }
        }
    } catch (error) {
        errorLog(error)
    };
}

const postProduct = async () => {
    if (!checkAdmin()) {
        return { response: "Can't access this page", status: 403 }
    }
    try {
        const { title, price, description, code, thumbnail, stock, category } = req.body;
        const newProduct = new Product(title, description, code, thumbnail, price, stock, category);
        const validatedProduct = productValidation(newProduct.title, newProduct.price, newProduct.description, newProduct.code, newProduct.thumbnail, newProduct.stock, newProduct.timestamp, newProduct.category);
        if (validatedProduct.error) {
            return validatedProduct;
        } else {
            const product = new productDTO(validatedProduct)
            await productManager.save(product);
            return product;
        }
    } catch (error) {
        errorLog(error)
    };
}

const updateProduct = async (id, rawProduct) => {
    if (!checkAdmin()) {
        return { response: "Can't access this page", status: 403 }
    }
    try {
        let product = new productDTO(rawProduct)
        let updatedProduct = {...product, id: id};
        await productManager.updateItem(updatedProduct);
        return updatedProduct
    } catch (error) {
        errorLog(error)
    };
}

const deleteProduct = async (id) => {
    if (!checkAdmin()) {
        return { response: "Can't access this page", status: 403 }
    }
    try { 
         return await productManager.deleteById(id)
    } catch (error) {
        errorLog(error)
    };
}

export { getProducts, getRandomProducts, getProduct, postProduct, updateProduct, deleteProduct }