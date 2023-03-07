import { Schema } from "mongoose";

const authorSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String },
})

const messageSchema = new Schema({
    author: authorSchema,
    senderID: { type: String, required: true },
    senderEmail: { type: String, required: true },
    admin: { type: Boolean },
    text: { type: String },
    date: { type: String }
});

export default messageSchema;