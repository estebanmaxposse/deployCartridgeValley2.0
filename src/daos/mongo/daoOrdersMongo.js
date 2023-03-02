import ContainerMongoDB from "../mongoManager.js";

class daoCartsMongo extends ContainerMongoDB {
    constructor() {
        super('order')
    }

    async getOrderNumber() {
        const orderNumber = await this.getAll()
        return orderNumber.length + 1
    }
}

export default daoCartsMongo