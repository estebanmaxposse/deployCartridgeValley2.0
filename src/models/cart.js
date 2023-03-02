class Cart {
    constructor(products) {
        this.timestamp = new Date().toLocaleDateString();
        this.products = products || [];
        this.buyerID = '';
        this.buyerEmail = '';
        this.buyerShippingAddress = '';
        this.cartTotalProducts = 0;
        this.cartTotalPrice = 0;
    };
};

export default Cart