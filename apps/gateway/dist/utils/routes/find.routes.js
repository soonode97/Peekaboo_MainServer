import { routingTable } from "../../source/router.source.js";
import { mapClients } from "../../source/router.source.js";
const findRouterService = (packetType) => {
  console.log("findRouting...");
  const routingServiceName = routingTable[packetType];
  for (const [key, value] of Object.entries(mapClients)) {
    if (value.info.name === routingServiceName) {
      return value.client;
    }
  }
};
export {
  findRouterService
};
//# sourceMappingURL=find.routes.js.map
