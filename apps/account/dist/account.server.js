import TcpServer from "@peekaboo-ssr/classes/TcpServer";
import config from "@peekaboo-ssr/config/account";
import G2SEventHandler from "./events/onG2S.event.js";
class AccountServer extends TcpServer {
  constructor() {
    super(
      "account",
      config.account.host,
      config.account.port,
      new G2SEventHandler()
    );
    this.connectToDistributor(
      config.distributor.host,
      config.distributor.port,
      (data) => {
        console.log("Distributor Notification: ", data);
      }
    );
  }
}
new AccountServer();
//# sourceMappingURL=account.server.js.map
