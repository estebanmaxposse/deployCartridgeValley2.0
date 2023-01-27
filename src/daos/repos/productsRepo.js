import productDTO from "../dtos/dtoProducts.js";
import productManager from "../daoProducts.js";

class productsRepo {
    constructor() {
        this.dao = productManager
    }

    async getAll() {
        const rawProducts = await this.dao.getAll();
        const products = rawProducts.map(p => new productDTO(p))
        return products
    }

    async getProduct(id) {
        const rawProduct = await this.dao.getById(id);
        const product = new productDTO(rawProduct)
        return product
    }

    async postProduct(rawProduct) {
        console.log('Before DTO: ', rawProduct);
        const product = new productDTO(rawProduct)
        await this.dao.save(product);
        console.log('After DTO: ', product);
        return product;
    }

    async updateProduct(id, rawProduct) {
        let product = new productDTO(rawProduct)
        let updatedProduct = {...product, id: id};
        await this.dao.updateItem(updatedProduct);
        return updatedProduct
    }

    async deleteProduct(id) {
        return await this.dao.deleteById(id)
    }
}

export default productsRepo