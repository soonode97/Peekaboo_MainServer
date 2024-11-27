import { createPacketG2S } from "@peekaboo-ssr/utils";
import { findRouterService } from "./find.routes.js";
const routeG2SHandler = (socket, packetType, payloadLength, payloadBuffer) => {
  try {
    console.log("----------- \uAC8C\uC774\uD2B8\uAC00 \uD074\uB77C\uC774\uC5B8\uD2B8\uB85C \uB370\uC774\uD130 \uBC1B\uC74C -----------");
    console.log(packetType, payloadLength, payloadBuffer);
    const clientKey = socket.remoteAddress + ":" + socket.remotePort;
    const routeBuffer = createPacketG2S(
      packetType,
      clientKey,
      payloadLength,
      payloadBuffer
    );
    console.log(routeBuffer);
    const routingClient = findRouterService(packetType);
    console.log(routingClient);
    routingClient.write(routeBuffer);
  } catch (e) {
    console.error(e);
  }
};
export {
  routeG2SHandler
};
//# sourceMappingURL=packet.routes.js.map
