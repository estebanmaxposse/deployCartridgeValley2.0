import args from '../utils/argsHandler.js'
import cluster from 'cluster';
import CPU from 'os'
import { log } from '../utils/logger.js';

const serverConfig = (server, port) => {
    switch (args.serverMode) {
        case 'fork':
            server.listen(port, () => {
                log(`Server running on ${port}`);
            });
            break;

        case 'cluster':
            if (cluster.isPrimary) {
                const numCPUs = CPU.cpus().length
                log(`Master ${process.pid} setting up ${numCPUs} workers...`);
        
                for (let index = 0; index < numCPUs; index++) {
                    cluster.fork()
                }
        
                cluster.on('online', (worker) => {
                    log('Worker ' + worker.process.pid + ' is online');
                });
                cluster.on('exit', (worker, code, signal) => {
                    log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
                });
            } else {
                server.listen(port, () => {
                    log(`Server running on ${port}`);
                });
            }
            break
        default:
            server.listen(port, () => {
                log(`Server running on ${port}`);
            });
            break;
    }
}

export default serverConfig