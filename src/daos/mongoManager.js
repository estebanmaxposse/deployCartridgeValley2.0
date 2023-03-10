import { model } from "mongoose";
import MongoClient from '../config/configMongo.js';
import productSchema from '../models/schemas/productSchema.js';
import cartSchema from '../models/schemas/cartSchema.js';
import messageSchema from '../models/schemas/messageSchema.js';
import userSchema from '../models/schemas/userSchema.js';
import orderSchema from '../models/schemas/orderSchema.js';
import config from '../config/globalConfig.js'
import { errorLog, log } from "../utils/logger.js";

const client = new MongoClient(config.MONGOATLAS_URL);
client.connectDb()

class ContainerMongoDB {
    constructor(name) {
        this.collectionName = name;

        if (name === 'products') {
            this.selectedSchema = productSchema
        } else if (name === 'cart') {
            this.selectedSchema = cartSchema
        } else if (name === 'messages') {
            this.selectedSchema = messageSchema
        } else if (name === 'users') {
            this.selectedSchema = userSchema
        } else if (name === 'order') {
            this.selectedSchema = orderSchema
        }

        this.content = model(this.collectionName, this.selectedSchema)
    };

    async getAll() {
        const content = await this.content.find();
        return content;
    };

    async save(object) {
        try {
            const saveObjectModel = new this.content(object);
            return saveObjectModel.save().then(item => item._id);
        } catch (error) {
            errorLog(error, `Failed to add object!`)
        };
    };

    async getById(id) {
        try {
            let foundElement = await this.content.findOne({ '_id': id });
            return foundElement;
        } catch (error) {
            errorLog(error, `Couldn't find ${id} object! ${error}`)
        };
    };

    async getByParameter(parameter) {
        try {
            const content = await this.content.find(parameter);
            if (Array.isArray(content) && content.length === 0) {
                return false
            }
            return content
        } catch (error) {
            errorLog(error, `Couldn't find objects with parameter: ${parameter}!`)
        }
    }

    async getUserByEmail(email) {
        let foundUser;
        try {
            foundUser = await this.content.findOne({ 'email': email });
        } catch (error) {
            errorLog(error, `Couldn't find ${email} object! ${error}`)
        }
        if (!foundUser) {
            errorLog("User not found")
        }
        return foundUser;
    }

    async updateItem(item) {
        try {
            const updateItem = await this.content.updateOne({ '_id': item._id || item.id }, item)
            return updateItem
        } catch (error) {
            errorLog(error, `Error updating ${item}`)
        }
    }

    async deleteById(id) {
        try {
            const deleteItem = await this.content.deleteOne({ '_id': id })
            return deleteItem
        } catch (error) {
            errorLog(error, `Error deleting ${id}`)
        }
    };

    async deleteAll() {
        try {
            await this.content.deleteMany();
            log(`All items deleted!`);
        } catch (error) {
            errorLog(error, `Error deleting all items`)
        };
    };
};

export default ContainerMongoDB;
