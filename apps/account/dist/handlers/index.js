import config from "@peekaboo-ssr/config/account";
import { loginRequestHandler } from "./auth/login.handler.js";
const handlers = {
  [config.clientPacket.account.LoginRequest]: {
    handler: loginRequestHandler
  }
};
const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    console.error("handler not found!!");
    return false;
  }
  return handlers[packetType].handler;
};
export {
  getHandlerByPacketType
};
//# sourceMappingURL=index.js.map
