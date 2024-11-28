import config from '@peekaboo-ssr/config/distributor';
import { registServiceHandler } from './service/registService.handler.js';
import { joinUserHandler } from './session/session.handler.js';

const handlers = {
  [config.servicePacket.CreateServiceRequest]: {
    handler: registServiceHandler,
  },
  [config.servicePacket.JoinUserSessionRequest]: {
    handler: joinUserHandler,
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    return false;
  }

  return handlers[packetType].handler;
};
