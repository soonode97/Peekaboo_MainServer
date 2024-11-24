import BaseHandler from '../handlers/base.handler.js';
import { config } from '../config/config.js';
import { createPacketForDistributor } from '../utils/packet/create.packet.js';

class FromDistributorHandler extends BaseHandler {
  onConnection(server) {
    console.log(
      `Distributor connected: ${server.clientToDistributor.options.host}:${server.clientToDistributor.options.port}`,
    );
    server.isConnectedDistributor = true;
    const buffer = createPacketForDistributor(
      config.packetType.service.RegistServiceRequest,
      server.context,
    );
    server.clientToDistributor.write(buffer);
  }

  async onData(server, data) {
    console.log('Distributor data: ', JSON.parse(data));
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

export default FromDistributorHandler;
