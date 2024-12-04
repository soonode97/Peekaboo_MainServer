// 로비 서버
import TcpServer from '@peekaboo-ssr/classes/TcpServer';
import config from '@peekaboo-ssr/config/lobby';
import G2SEventHandler from './events/onG2S.event.js';
import { handlers } from './handlers/index.js';
import { Room } from './classes/models/room.class.js';
import { rooms } from '../room/room.js';

class LobbyServer extends TcpServer {
  constructor() {
    super('lobby', config.lobby.host, config.lobby.port, new G2SEventHandler());

    this.handlers = handlers;

    this.connectToDistributor(
      config.distributor.host,
      config.distributor.port,
      (data) => {
        // 이건 이제 접속하고 등록절차를 밟으면 noti를 콜백으로 호출하는 것
        console.log('Distributor Notification: ', data);
      },
    );
    rooms.push(new Room('tempId001', 'EXAMPLE'));
    rooms.push(new Room('tempId002', 'EXAMPLE'));
  }
}

new LobbyServer();
