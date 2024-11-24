// TCP Server 클래스를 선언 및 정의한 곳,
// TCP 서버 서비스 노드를 생성시키고 각 데이터 송수신, 연결 수립, 연결 종료, 에러에 따른 행동을 정의

import net from 'net';
import TcpClient from './tcpClient.class.js';
import FromDistributorHandler from '../../events/fromDistributor.event.js';

class TcpServer {
  constructor(name, host, port, handler) {
    // 마이크로서비스 정보
    this.context = {
      host: host,
      port: port,
      name: name,
    };
    this.handler = handler;
    // Distributor에 접속했는지 확인을 위한 변수
    this.isConnectedDistributor = false;
    // 연결된 Distributor
    this.clientToDistributor = null;
    this.distributorClientHandler = new FromDistributorHandler();

    this.initServer();
  }

  // TCP 서버를 열고 초기화
  initServer() {
    // 서버를 생성
    this.server = net.createServer((socket) => {
      this.handler.onConnection(socket);
      socket.on('data', (data) => this.handler.onData(socket, data));
      socket.on('end', () => this.handler.onEnd(socket));
      socket.on('error', (err) => this.handler.onError(socket, err));
    });

    // 서버 리슨
    this.server.listen(this.context.port, () => {
      console.log(
        `${this.context.name} 서버가 ${this.context.host} : ${this.context.port}에서 대기 중`,
      );
    });
  }

  // ---------- Distributor 부분 ------------
  // Distributor에 접속하는 함수
  // Distributor에 본인(노드)를 추가
  // 인자로 distributor의 host, port 를 받아옴
  connectToDistributor(host, port, onNoti) {
    this.clientToDistributor = new TcpClient(
      host,
      port,
      () => {
        this.distributorClientHandler.onConnection(this);
      },
      (options, data) => {
        this.distributorClientHandler.onData(this, data);
      },
      (options) => {
        this.distributorClientHandler.onEnd(this);
      },
      (options, err) => {
        this.distributorClientHandler.onError(this);
      },
    );

    setInterval(() => {
      if (this.isConnectedDistributor != true) {
        this.clientToDistributor.connect();
      }
    }, 3000);
  }
}

export default TcpServer;
