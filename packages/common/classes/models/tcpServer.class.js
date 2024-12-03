// TCP Server 클래스를 선언 및 정의한 곳,
// TCP 서버 서비스 노드를 생성시키고 각 데이터 송수신, 연결 수립, 연결 종료, 에러에 따른 행동을 정의

import net from 'net';
import TcpClient from './tcpClient.class.js';
import D2SEventHandler from '../../events/onD2S.event.js';
import redisManager from '../managers/redis.manager.js';

class TcpServer {
  constructor(name, host, port, event) {
    // 마이크로서비스 정보
    this.context = {
      host: host,
      port: port,
      name: name,
    };
    this.event = event;
    // Distributor에 접속했는지 확인을 위한 변수
    this.isConnectedDistributor = false;
    // 연결된 Distributor
    this.clientToDistributor = null;
    this.redisClient = redisManager.client;
    this.handlers = null;
    this.onD2SEvent = new D2SEventHandler();

    this.initServer();
    this.initializePubSub();
  }

  // TCP 서버를 열고 초기화
  initServer() {
    // 서버를 생성
    this.server = net.createServer((socket) => {
      this.event.onConnection(socket);

      if (
        this.context.name === 'distributor' ||
        this.context.name === 'gateway'
      ) {
        socket.on('data', (data) => this.event.onData(socket, data, this));
      } else {
        socket.on('data', (data) => this.event.onData(socket, data, this));
      }
      socket.on('end', () => this.event.onEnd(socket));
      socket.on('error', (err) => this.event.onError(socket, err));
    });

    // 서버 리슨
    this.server.listen(this.context.port, () => {
      console.log(
        `${this.context.name} 서버가 ${this.context.host} : ${this.context.port}에서 대기 중`,
      );
    });
  }

  // ---------- Distributor에 연결된 클라이언트 혹은 서비스에 연결된 게이트웨이의 클라이언트 부분 ------------
  connectToDistributor(host, port, notification) {
    this.clientToDistributor = new TcpClient(
      host,
      port,
      (options) => {
        this.onD2SEvent.onConnection(this);
      },
      (options, data) => {
        this.onD2SEvent.onData(this, data);
      },
      (options) => {
        this.onD2SEvent.onEnd(this);
      },
      (options, err) => {
        this.onD2SEvent.onError(this);
      },
    );

    setInterval(() => {
      if (this.isConnectedDistributor != true) {
        this.clientToDistributor.connect();
      }
    }, 3000);
  }

  // PubSub 채널 구독 설정
  initializePubSub() {
    const subName = this.context.name;
    this.redisClient.subscribe(`${subName}_service_request`, (error) => {
      if (error) {
        console.error(`${subName} Subscription Error: ${error.message}`);
      } else {
        console.log(`Subscribed to ${subName}_service_request channel`);
      }
    });

    this.redisClient.on('message', (channel, message) => {
      if (channel === `${subName}_service_request`) {
        const data = JSON.parse(message);
        const handler = this.getRedisHandler(data.action);
        handler(this, data);
      }
    });
  }

  getRedisHandlerByMessage = (message) => {
    if (!this.handlers.pubsub[message]) {
      console.error('Redis handler not found!!');
      return false;
    }
    return this.handlers.pubsub[message].handler;
  };

  getClientHandlerByPacketType = (packetType) => {
    if (!this.handlers.client[packetType]) {
      console.error('PacketType handler not found!!');
      return false;
    }
    return this.handlers.client[packetType].handler;
  };

  getServiceHandlerByPacketType = (packetType) => {
    if (!this.handlers.service[packetType]) {
      console.error('PacketType handler not found!!');
      return false;
    }
    return this.handlers.service[packetType].handler;
  };
}

export default TcpServer;
