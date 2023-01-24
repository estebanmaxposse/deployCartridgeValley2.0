import config from '../config/globalConfig.js'
import daoCartsMongo from './mongo/daoCartsMongo.js';

const selectedDB = config.DATABASE;

class cartFactory {
    createCartManager() {
        switch (selectedDB) {
            case 'mongo':
                return new daoCartsMongo()
                break;
            // case 'firebase':
            //     return daocartsFirebase()
            //     break;
            default:
                return new daoCartsMongo()
                break;
        }
    }
}

let factory = new cartFactory()
let cartManager = factory.createCartManager()

export default cartManager