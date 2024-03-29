import { getInfo } from '../services/miscServices.js';
import globalConfig from '../config/globalConfig.js';
import { log } from '../utils/logger.js';

const getInfoController = async (req, res) => {
    try {
        let info = await getInfo()
        const {globalConfig}  = info
        info = {...globalConfig}
        log(info);
        res.render('info.pug', { info })
    } catch (error) {
        throw new Error(error);
    }
}

const notFound404 = async (req, res, next) => {
    res.status(404).json({
        error: {
          'message':'Invalid Request',
          'statusCode':404,
          'stack': globalConfig.BACKEND_URL
        },
         message: 'Page not found!'
      });
    next();
}

export { getInfoController, notFound404 }