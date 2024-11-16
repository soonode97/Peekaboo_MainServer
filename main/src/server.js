import initServer from './init/index.js';
import net from 'net';
import { onConnection } from './events/onConnection.js';
import { config } from './config/config.js';

const mainServer = net.createServer(onConnection);
initServer()
  .then(() => {
    mainServer.listen(config.server.port, config.server.host, () => {
      console.log(`MAIN 서버가 포트 ${config.server.port}에서 대기 중`);
      console.log(mainServer.address());
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
