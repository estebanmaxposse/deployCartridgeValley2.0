class productDTO {
    constructor(product) {
        this.title = product.title
        this.description = product.description
        this.price = product.price
        this.stock = product.stock
        this.code = product.code
        this.category = product.category
        this.thumbnail = product.thumbnail
    }
}

export default productDTO