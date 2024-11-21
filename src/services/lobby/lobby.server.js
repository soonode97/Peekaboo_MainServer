// 로비 서버
import TcpServer from '../tcpServer.js';
import { config } from '../../config/config.js';

// 여기서 로비서버에서 받는 패킷 타입에 따라 핸들링을 나누어야 함
// 해당 핸들러는 서버마다 '독립적'으로 운영되는 것이 핵심

class LobbyServer extends TcpServer {
  constructor() {
    super('Lobby', config.lobbyServer.host, config.lobbyServer.port);

    // 생성이 되면 자동적으로 distributor에 접속할 수 있도록 함.
    this.connectToDistributor(
      config.distributor.host,
      config.distributor.port,
      (data) => {
        // 이건 이제 접속하고 등록절차를 밟으면 noti를 콜백으로 호출하는 것
        console.log('Distributor Notification: ', data);
      },
    );
  }

  // 클라이언트 요청에 따라 비즈니스 로직을 호출하는 함수
  // 여기서 맞는 handler를 호출해야할듯 싶음.
  // onRead(socket, data) {
  //   console.log('onRead', socket.remoteAddress, socket.remotePort, data);
  // }
}

new LobbyServer();
