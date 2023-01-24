import productDTO from "../dtos/dtoProducts.js";
import productManager from "../daoProducts.js";

class productsRepo {
    constructor() {
        this.dao = productManager
    }

    async getAll() {
        const rawProducts = await productManager.getAll();
        const products = rawProducts.map(p => new productDTO(p))
        return products
    }

    async getProduct(id) {
        const rawProduct = await productManager.getById(id);
        const product = new productDTO(rawProduct)
        return product
    }

    async postProduct(rawProduct) {
        const product = new productDTO(rawProduct)
        await productManager.save(product);
        return product;
    }

    async updateProduct(id, rawProduct) {
        let product = new productDTO(rawProduct)
        let updatedProduct = {...product, id: id};
        await productManager.updateItem(updatedProduct);
        return updatedProduct
    }

    async deleteProduct(id) {
        return await productManager.deleteById(id)
    }
}

export default productsRepo