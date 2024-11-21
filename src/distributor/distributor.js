// 각 마이크로서비스를 연결해주고 ip:port 를 게이트웨이에게 분배해주는 역할
import TcpServer from '../services/tcpServer.js';
import { config } from '../config/config.js';

class Distributor extends TcpServer {
  constructor() {
    super('distributor', config.distributor.host, config.distributor.port);
  }
}

new Distributor();
