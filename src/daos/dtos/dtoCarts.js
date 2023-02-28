class cartDTO {
    constructor(cart) {
        this._id = cart._id
        this.timestamp = cart.timestamp
        this.products = cart.products
        this.buyerID = cart.buyerID
        this.buyerEmail = cart.buyerEmail
        this.buyerShippingAddress = cart.buyerShippingAddress
    }
}

export default cartDTO