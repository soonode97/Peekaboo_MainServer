import { createRoutingTable } from "../utils/routes/create.routes.js";
import config from "@peekaboo-ssr/config/gateway";
const mapClients = {};
const mapResponse = {};
const mapRR = {};
const routingTable = createRoutingTable(config.clientPacket);
export {
  mapClients,
  mapRR,
  mapResponse,
  routingTable
};
//# sourceMappingURL=router.source.js.map
