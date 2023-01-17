import config from '../config/globalConfig.js'
import daoCartsMongo from './mongo/daoCartsMongo.js';

let selectedDB = config.DATABASE;
let cartManager

switch (selectedDB) {
    case 'mongo':
        cartManager = new daoCartsMongo()
        break;
    // case 'firebase':
    //     cartManager = new daocartsFirebase()
    //     break;
    // default:
    //     cartManager = new daocartsFile('carts.json')
    //     break;
}

export default cartManager