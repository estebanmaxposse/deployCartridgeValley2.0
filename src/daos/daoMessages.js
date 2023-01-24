import config from '../config/globalConfig.js'
import daoMessagesMongo from './mongo/daoMessagesMongo.js';

let selectedDB = config.DATABASE;

class messageFactory {
    createMessageManager() {
        switch (selectedDB) {
            case 'mongo':
                return new daoMessagesMongo()
                break;
            // case 'firebase':
            //     return new daoMessagesFirebase()
            //     break;
            default:
                return new daoMessagesMongo()
                break;
        }
    }
}

let factory = new messageFactory()
let messageManager = factory.createMessageManager()

export default messageManager