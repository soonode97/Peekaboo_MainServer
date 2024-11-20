import net from 'net';
import initServer from './init/index.js';
import { config } from '../../config/config.js';
import { onConnection } from './events/onConnection.js';

const lobbyServer = net.createServer(onConnection);

initServer()
  .then(() => {
    lobbyServer.listen(config.server.lobbyPort, config.server.host, () => {
      console.log(`LOBBY 서버가 포트 ${config.server.port}에서 대기 중`);
      console.log(lobbyServer.address());
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
