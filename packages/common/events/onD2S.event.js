import BaseEvent from './base.events.js';
import { DISTRIBUTOR_PACKET } from '../../modules/constants/packet.js';
import { createPacketS2D } from '../utils/packet/create.packet.js';

class D2SEventHandler extends BaseEvent {
  onConnection(server) {
    console.log(
      `Distributor connected from: ${server.clientToDistributor.options.host}:${server.clientToDistributor.options.port}`,
    );
    server.isConnectedDistributor = true;
    const buffer = createPacketS2D(
      DISTRIBUTOR_PACKET.CreateServiceRequest,
      server.context,
    );
    server.clientToDistributor.write(buffer);
  }

  // 여기는 추후 데이터 어떤 방식으로 송수신할건지 정의되면 바뀔 수 있음.
  onData(server, data) {
    const parsedData = JSON.parse(data);
    if (server.context.name === 'gateway') {
      server.onDistribute(parsedData);
    }
    console.log('Distributor data: ', parsedData);
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
