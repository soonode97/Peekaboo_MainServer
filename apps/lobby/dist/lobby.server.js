import TcpServer from "@peekaboo-ssr/classes/TcpServer";
import config from "@peekaboo-ssr/config/lobby";
import G2SEventHandler from "./events/onG2S.event.js";
class LobbyServer extends TcpServer {
  constructor() {
    super("lobby", config.lobby.host, config.lobby.port, new G2SEventHandler());
    this.connectToDistributor(
      config.distributor.host,
      config.distributor.port,
      (data) => {
        console.log("Distributor Notification: ", data);
      }
    );
  }
}
new LobbyServer();
//# sourceMappingURL=lobby.server.js.map
