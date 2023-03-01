class Cart {
    constructor(products) {
        this.timestamp = new Date().toLocaleDateString();
        this.products = products || [];
        this.buyerID = '';
        this.buyerEmail = '';
        this.buyerShippingAddress = '';
    };
};

export default Cart