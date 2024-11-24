import { config } from '@peekaboo-ssr/config';
import TcpServer from '@peekaboo-ssr/class/TcpServer';
import TcpClient from '@peekaboo-ssr/class/TcpClient';
import FromClientHandler from './src/events/fromClient.event.js';

class GatewayServer extends TcpServer {
  constructor() {
    super(
      'Gateway',
      config.gatewayServer.host,
      config.gatewayServer.port,
      new FromClientHandler(),
    );
    this.mapClients = {};
    this.mapHosts = {};
    this.mapResponse = {};
    this.mapRR = {};
    this.index = 0;

    // this.clientToDistributor = new TcpClient(config.distributor.host, config.distributor.port, (options) => {
    //   this.isConnectedDistributor = true;
    //   this.clientToDistributor.write.
    // });
  }
}

new GatewayServer();
