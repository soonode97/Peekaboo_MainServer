// 세션 서버
import TcpServer from '@peekaboo-ssr/classes/TcpServer';
import config from '@peekaboo-ssr/config/session';
import G2SEventHandler from './events/onG2S.event.js';
import redisManager from '@peekaboo-ssr/classes/RedisManager';
import { handlers } from './handlers/index.js';

class SessionServer extends TcpServer {
  constructor() {
    super(
      'session',
      config.session.host,
      config.session.port,
      new G2SEventHandler(),
    );

    this.sessions = {};
    this.handlers = handlers;

    this.connectToDistributor(
      config.distributor.host,
      config.distributor.port,
      (data) => {
        // 이건 이제 접속하고 등록절차를 밟으면 noti를 콜백으로 호출하는 것
        console.log('Distributor Notification: ', data);
      },
    );
  }

  getSessionsByType(type) {
    return this.sessions[type];
  }
}

new SessionServer();
