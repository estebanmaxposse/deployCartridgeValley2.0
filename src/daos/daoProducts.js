import config from '../config/globalConfig.js'
import daoProductsMongo from './mongo/daoProductsMongo.js'

let selectedDB = config.DATABASE;
let productManager

switch (selectedDB) {
    case 'mongo':
        productManager = new daoProductsMongo()
        break;
    // case 'firebase':
    //     productManager = new daoProductsFirebase()
    //     break;
    // default:
    //     productManager = new daoProductsFile('products.json')
    //     break;
}

export default productManager