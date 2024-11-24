import http from 'http';
import { config } from '../config/config.js';
import TcpClient from '../services/tcpClient.js';
import { createPacketForDistributor } from './utils/packet/create.packet.js';
import { onDataFromDistributor } from './events/distributor/onData.distributor.js';
import { SERVICES_PACKET_TYPE } from '../constants/header.js';
import { onRequest } from './events/api/onRequest.api.js';

class GatewayServer {
  constructor() {
    this.context = {
      host: config.gatewayServer.host,
      port: config.gatewayServer.port,
      name: 'Gateway',
    };
    this.mapClients = {};
    this.mapHosts = {};
    this.mapResponse = {};
    this.mapRR = {};
    this.index = 0;

    this.distributorClient = null;
    this.isConnectedDistributor = false;

    this.initServer();
  }

  initServer() {
    this.server = http.createServer((req, res) => {
      onRequest(req, res);
    });

    this.server.listen(config.gatewayServer.port, () => {
      console.log(
        `API Gateway Server is running on port: ${config.gatewayServer.port}`,
      );

      // 여기서 Distributor에 연결 수행
      // 1. Distributor에 연결을 진행
      // 2. Distributor에서 제공해준 서비스들의 호스트들과 tcpClient 연결 수립
      // 3. 해당 tcpClient들을 mapClients에 담아서 관리하는 방향

      this.distributorClient = new TcpClient(
        config.distributor.host,
        config.distributor.port,
        (options) => {
          this.isConnectedDistributor = true;
          this.distributorClient.write(packet);
        },
        (options, data) => {
          onDataFromDistributor(data);
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
        registerToDistributor();
      },
      (options, data) => {
        onDataFromDistributor(data);
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
}

new GatewayServer();
