import TcpServer from "@peekaboo-ssr/classes/TcpServer";
import TcpClient from "@peekaboo-ssr/classes/TcpClient";
import C2GEventHandler from "./events/onC2G.event.js";
import S2GEventHandler from "./events/onS2G.event.js";
import config from "@peekaboo-ssr/config/gateway";
import { mapClients } from "./source/router.source.js";
class GatewayServer extends TcpServer {
  constructor() {
    super(
      "gateway",
      config.gateway.host,
      config.gateway.port,
      new C2GEventHandler()
    );
    this.S2GEventHandler = new S2GEventHandler();
    this.index = 0;
    this.connectToDistributor(
      config.distributor.host,
      config.distributor.port,
      (data) => {
        console.log("Distributor Notification: ", data);
      }
    );
  }
  // 각 서비스간 연결이 필요
  // 게이트웨이 mapClients에 연결된 노드 정보를 저장하는 함수
  onDistribute(data) {
    for (let i in data.microservices) {
      const node = data.microservices[i];
      const key = node.host + ":" + node.port;
      if (!mapClients[key] && node.name !== "gateway") {
        const client = new TcpClient(
          node.host,
          node.port,
          (options) => {
            this.S2GEventHandler.onConnection(client);
          },
          (options, data2) => {
            this.S2GEventHandler.onData(client, data2);
          },
          () => {
            this.S2GEventHandler.onEnd(client);
          },
          () => {
            this.S2GEventHandler.onError(client);
          }
        );
        mapClients[key] = {
          client,
          info: node
        };
        client.connect();
      }
    }
  }
}
new GatewayServer();
//# sourceMappingURL=gateway.js.map
