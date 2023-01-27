import { errorLog } from "../utils/logger.js";
import { getProducts, getRandomProducts, getProduct, postProduct, updateProduct, deleteProduct } from "../services/productServices.js";

const getProductsController = async (req, res) => {
    try {
        let products = await getProducts()
        if (products.status === 200) {
            res.json(products.response)
        } else {
            res.status(products.status).json(products.response)
        }
    } catch (error) {
        errorLog(error)
    };
}

const getRandomProductsController = async (req, res) => {
    try {
        const products = getRandomProducts()
        res.render('productsRandom.pug', {products})
    } catch (error) {
        errorLog(error)
    };
}

const getProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProduct(id);
        if (product.status === 200) {
            res.json(product.response)
        } else {
            res.status(product.status).json(product.response)
        }
    } catch (error) {
        errorLog(error)
    };
}

const postProductController = async (req, res) => {
    try { 
        const rawProduct = req.body;
        let query = await postProduct(rawProduct)
        console.log(query);
        if (query.status === 200) {
            res.json(query.response)
        } else {
            res.status(query.status).json(query.response)
        }
    } catch (error) {
        errorLog(error)
    };
}

const updateProductController = async (req, res) => {
    try {
        let { id } = req.params;
        let updatedProduct = await updateProduct(id, req.body)
        res.json(updatedProduct);
    } catch (error) {
        errorLog(error)
    };
}

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        res.json(await deleteProduct(id))
    } catch (error) {
        errorLog(error)
    };
}

export { getProductsController, getProductController, getRandomProductsController, postProductController, updateProductController, deleteProductController }