import config from '../config/globalConfig.js'
import daoOrdersMongo from './mongo/daoOrdersMongo.js';

const selectedDB = config.DATABASE;
let instance = null

class orderFactory {
    //SINGLETON TEST
    constructor() {
        this.value = Math.random(100)
    }

    printValue() {
        console.log(this.value)
    }

    static getInstance() {
        if (!instance) {
            instance = new orderFactory()
        }
        return instance
    }

    //FACTORY PATTERN
    createOrderManager() {
        switch (selectedDB) {
            case 'mongo':
                return new daoOrdersMongo()
                break;
            default:
                return new daoOrdersMongo()
                break;
        }
    }
}

//SINGLETON TEST
let factory = orderFactory.getInstance()
// let con2 = orderFactory.getInstance()
// con1.printValue()
// con2.printValue()
// console.log(con1 === con2);

let orderManager = instance.createOrderManager()

export default orderManager