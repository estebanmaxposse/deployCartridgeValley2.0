import { Schema } from "mongoose";

const OrderSchema = new Schema({
    orderNumber: { type: Number, require: true },
    timestamp: { type: String, require: true },
    status: { type: String, require: true },
    buyerEmail: { type: String, require: true },
    buyerShippingAddress: { type: String, require: true },
    products: [],
    orderTotalProducts: { type: Number, require: true },
    orderTotalPrice: { type: Number, require: true },
})

export default OrderSchema;