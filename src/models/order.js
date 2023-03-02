class Order {
    constructor(products) {
        this.timestamp = new Date().toLocaleDateString();
        this.status = 'pending';
        this.products = products || [];
        this.orderNumber = 0;
        this.buyerID = '';
        this.buyerEmail = '';
        this.buyerShippingAddress = '';
        this.orderTotalProducts = 0;
        this.orderTotalPrice = 0;
    }
}

export default Order