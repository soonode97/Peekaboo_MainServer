import TcpServer from "@peekaboo-ssr/classes/TcpServer";
import config from "@peekaboo-ssr/config/distributor";
import S2DEventHandler from "./events/onS2D.event.js";
class Distributor extends TcpServer {
  constructor() {
    super(
      "distributor",
      config.distributor.host,
      config.distributor.port,
      new S2DEventHandler()
    );
  }
}
new Distributor();
//# sourceMappingURL=distributor.js.map
