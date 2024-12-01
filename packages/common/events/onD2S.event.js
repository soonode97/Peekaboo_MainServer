import BaseEvent from './base.events.js';
import { SERVICE_PACKET } from '../../modules/constants/packet/service.packet.js';
import { createPacketS2S } from '@peekaboo-ssr/utils/createPacket';
import { getHandlerByPacketType } from '../../handlers/index.js';

class D2SEventHandler extends BaseEvent {
  onConnection(server) {
    console.log(
      `Distributor connected from: ${server.clientToDistributor.options.host}:${server.clientToDistributor.options.port}`,
    );
    server.isConnectedDistributor = true;
    console.log('이거 서비스 이름: ', server.context.name);

    // 서비스가 Distributor와 연결되었을 때 등록 요청을 보냄
    const registPacket = {
      host: server.context.host,
      port: server.context.port,
      name: server.context.name,
    };
    const buffer = createPacketS2S(
      SERVICE_PACKET.CreateServiceRequest,
      server.context.name,
      'distributor',
      registPacket,
    );
    server.clientToDistributor.write(buffer);
  }

  async onData(server, data) {
    const handler = getHandlerByPacketType(data.packetType);
    await handler(server, data);
  }

  onEnd(server) {
    console.log('Distributor connection ended');
    server.isConnectedDistributor = false;
  }

  onError(server, err) {
    console.error('Error with Distributor connection:', err);
    server.isConnectedDistributor = false;
  }
}

export default D2SEventHandler;
