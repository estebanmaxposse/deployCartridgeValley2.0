import config from '../config/globalConfig.js'
import daoMessagesMongo from './mongo/daoMessagesMongo.js';

let selectedDB = config.DATABASE;
let messageManager

switch (selectedDB) {
    case 'mongo':
        messageManager = new daoMessagesMongo()
        break;
    // case 'firebase':
    //     messageManager = new daoMessagesFirebase()
    //     break;
    // default:
    //     messageManager = new daoMessagesFile('Messages.json')
    //     break;
}

export default messageManager