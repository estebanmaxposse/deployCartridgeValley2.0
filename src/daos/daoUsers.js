import config from '../config/globalConfig.js'
import daoUsersMongo from './mongo/daoUsersMongo.js'

let selectedDB = config.DATABASE;
let userManager

switch (selectedDB) {
    case 'mongo':
        userManager = new daoUsersMongo()
        break;
    // case 'firebase':
    //     userManager = new daoUsersFirebase()
    //     break;
    // default:
    //     userManager = new daoUsersFile('Users.json')
    //     break;
}

export default userManager