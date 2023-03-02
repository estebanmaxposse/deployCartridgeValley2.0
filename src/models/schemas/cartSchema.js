import { Schema } from "mongoose";

const cartSchema = new Schema({
    timestamp: { type: String, require: true },
    products: [],
    buyerID: { type: String },
    buyerEmail: { type: String },
    buyerShippingAddress: { type: String },
    cartTotalProducts: { type: Number },
    cartTotalPrice: { type: Number },
});

export default cartSchema;