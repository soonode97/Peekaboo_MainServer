import parserPacket from '../../utils/packet/parser.packet.js';
import { getHandlerByPacketType } from '../../../handlers/index.js';
import lobbySocket from '../../connection/lobby.connection.js';

// 버퍼가 들어왔을 때 패킷 타입에 따라 보내야 할 서버를 지정해주는 매니저
class ProxyManager {
  static instance = null;
  packetProxyServerMap = new Map();
  constructor() {
    if (!this.instance) {
      ProxyManager.instance = this;
    }

    return ProxyManager.instance;
  }

  // packetType에 따른 프록시 서버 지정
  registerProxyServer(packetType, serverType) {
    this.packetProxyServerMap.set(packetType, serverType);
  }

  // packetType에 따른 프록시 서버 가져옴
  getProxyServer(packetType) {
    this.packetProxyServerMap.get(packetType);
  }

  // 메인 또는 프록시 서버로 보내기 위한 데이터 전송
  async sendProxyServerToPacket(socket, packetType, payloadBuffer) {
    const serverType = this.getProxyServer(packetType);

    switch (serverType) {
      // 메인 서버에서 다루어질 패킷으로 await handler() 실행하도록 함
      case 1:
        try {
          const { payload } = parserPacket(payloadBuffer);
          socket.buffer = socket.buffer.subarray(offset);

          const handler = getHandlerByPacketType(packetType);
          handler({ socket, payload });
        } catch (e) {
          console.error(e);
        }
        break;
      // 로비 서버에서 다루어질 패킷으로 로비 서버로 전송하도록 함
      // 소켓 구분이 되어야 하기 때문에 고유값을 추가로 붙여서 전송
      case 2:
        const token = socket.token;

        if (!lobbySocket) {
          console.error('로비서버 연결 안됨.');
          return;
        }

        lobbySocket.write();
    }
  }
}

const proxy = new ProxyManager();

export default proxy;
