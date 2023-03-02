class orderDTO {
    constructor(order) {
        this._id = order._id;
        this.timestamp = order.timestamp;
        this.products = order.products;
        this.orderNumber = order.orderNumber;
        this.buyerID = order.buyerID;
        this.buyerEmail = order.buyerEmail;
        this.buyerShippingAddress = order.buyerShippingAddress;
        this.orderTotalProducts = order.orderTotalProducts;
        this.orderTotalPrice = order.orderTotalPrice;
        this.status = order.status;
    }
}

export default orderDTO