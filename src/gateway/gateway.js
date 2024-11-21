import connectionFromClient from '../events/gatewayEvent/onConnection.event.js';
import net from 'net';
import { config } from '../config/config.js';
import TcpClient from '../services/tcpClient.js';
import { createPacketForDistributor } from './utils/request/requestToDistributor.packet.js';
import { SERVICES_PACKET_TYPE } from '../constants/header.js';

class GatewayServer {
  constructor() {
    this.context = {
      host: config.gatewayServer.host,
      port: config.gatewayServer.port,
      name: 'Gateway',
    };
    this.client = {};
    this.distributorClient = null;
    this.isConnectedDistributor = false;

    this.initServer();
    this.connectToDistributor(this.context.host, this.context.port, (data) => {
      console.log('Distributor Notification: ', data);
    });
  }

  // TCP 서버를 열고 초기화하는 부분
  initServer() {
    this.server = net.createServer(connectionFromClient);

    this.server.listen(this.context.port, () => {
      console.log(
        `게이트웨이가 ${this.context.host} : ${this.context.port}에서 실행 중`,
      );
    });
  }

  // ---------- Distributor 부분 ------------
  connectToDistributor(host, port, onNoti) {
    this.distributorClient = new TcpClient(
      config.distributor.host,
      config.distributor.port,
      () => {
        console.log('Connected to Distributor');
        this.isConnectedDistributor = true;
        this.registerToDistributor();
      },
      (options, data) => {
        this.handleDistributorData(data);
        // onNoti(data);
      },
      () => {
        console.log('Disconnected from Distributor');
        this.isConnectedDistributor = false;
      },
      (err) => {
        console.error('Distributor connection error: ', err);
        this.isConnectedDistributor = false;
      },
    );

    setInterval(() => {
      if (this.isConnectedDistributor != true) {
        this.distributorClient.connect();
      }
    }, 3000);
  }

  registerToDistributor() {
    const buffer = createPacketForDistributor(
      SERVICES_PACKET_TYPE.RegistServiceRequest,
      this.context,
    );

    this.distributorClient.write(buffer);
  }

  handleDistributorData(data) {
    // console.log('Distributor data: ', data);
  }
}

new GatewayServer();
