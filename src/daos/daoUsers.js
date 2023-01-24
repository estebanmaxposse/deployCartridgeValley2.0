import config from '../config/globalConfig.js'
import daoUsersMongo from './mongo/daoUsersMongo.js'

let selectedDB = config.DATABASE;

class userFactory {
    createUserManager() {
        switch (selectedDB) {
            case 'mongo':
                return new daoUsersMongo()
                break;
            // case 'firebase':
            //     return new daoUsersFirebase()
            //     break;
            default:
                return new daoUsersMongo()
                break;
        }
    }
}

let factory = new userFactory()
let userManager = factory.createUserManager()

export default userManager