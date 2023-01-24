import config from '../config/globalConfig.js'
import daoProductsMongo from './mongo/daoProductsMongo.js'

let selectedDB = config.DATABASE;

class productFactory {
    createProductManager() {
        switch (selectedDB) {
            case 'mongo':
                return new daoProductsMongo()
                break;
            // case 'firebase':
            //     return new daoProductsFirebase()
            //     break;
            default:
                return new daoProductsMongo()
                break;
        }
    }
}

let factory = new productFactory()
let productManager = factory.createProductManager()

export default productManager