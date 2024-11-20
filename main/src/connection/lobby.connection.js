import net from 'net';
import { config } from '../../../config/config.js';

let lobbySocket = null;

export const connectToLobbyServer = () => {
  lobbySocket = net.createConnection(
    {
      host: config.server.host,
      port: config.server.lobbyPort,
    },
    () => {
      console.log(`Connected to Lobby server.`);
    },
  );

  lobbySocket.on('data', (data) => {
    // 그냥 버퍼 형태를 전달받음
  });

  lobbySocket.on('error', (err) => {
    console.error('Lobby server connection error', err);
  });

  lobbySocket.on('end', () => {
    console.log('Disconnected from Lobby server.');
    // 연결이 끊기면 다시 연결을 할 수 있도록 요청
    setTimeout(connectToLobbyServer, 5000);
  });
};

export default lobbySocket;
