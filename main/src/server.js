import initServer from './init/index.js';
import net from 'net';
import { onConnection } from './events/onConnection.js';
import { config } from '../../config/config.js';
import { connectToLobbyServer } from './connection/lobby.connection.js';

const mainServer = net.createServer(onConnection);
initServer()
  .then(() => {
    mainServer.listen(config.server.mainPort, config.server.host, () => {
      console.log(`MAIN 서버가 포트 ${config.server.port}에서 대기 중`);
      console.log(mainServer.address());
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

connectToLobbyServer();
