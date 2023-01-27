import productValidation from "../utils/validator.js";
import Product from "../models/product.js";
import mockProducts from "../utils/mockProducts.js";
import { errorLog } from "../utils/logger.js";
import productsRepo from "../daos/repos/productsRepo.js";

const generateProducts = new mockProducts()
const productsRepository = new productsRepo()

const admin = true;

const checkAdmin = () => admin;

const getProducts = async () => {
    try {
        let products = await productsRepository.getAll()
        const productExists = products.length !== 0;
        if (productExists) {
            return { response: products, status: 200 }
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
        const product = await productsRepository.getProduct(id)
        let productExists = true;
        if (!product) {
            productExists = false;
        };
        if (productExists) {
             return { response: product, status: 200 }
        } else {
            return { response: "Couldn't find product!", status: 404 }
        }
    } catch (error) {
        errorLog(error)
        return { response: "Couldn't find product!", status: 404 }
    };
}

const postProduct = async (rawProduct) => {
    if (!checkAdmin()) {
        return { response: "Can't access this page", status: 403 }
    }
    const newProduct = new Product(rawProduct);
    const validatedProduct = productValidation(newProduct);
    if (validatedProduct.error) {
        return validatedProduct;
    } else {
        try {
            const savedProduct = await productsRepository.postProduct(validatedProduct)
            return { response: `Product ${savedProduct.title} saved`, status: 201 }
        } catch (error) {
            errorLog(error)
            return { response: "Couldn't save product", status: 500 }
        };
    }
}

const updateProduct = async (id, rawProduct) => {
    if (!checkAdmin()) {
        return { response: "Can't access this page", status: 403 }
    }
    try {
        await productsRepository.updateProduct(id, rawProduct)
    } catch (error) {
        errorLog(error)
    };
}

const deleteProduct = async (id) => {
    if (!checkAdmin()) {
        return { response: "Can't access this page", status: 403 }
    }
    try { 
         await productsRepository.deleteProduct(id)
    } catch (error) {
        errorLog(error)
    };
}

export { getProducts, getRandomProducts, getProduct, postProduct, updateProduct, deleteProduct }