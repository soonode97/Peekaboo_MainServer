import { config } from '@peekaboo-ssr/config';
import { pingHandler } from './service/ping.handler.js';
import { registServiceHandler } from './service/registService.handler.js';

const handlers = {
  [config.packetType.service.RegistServiceRequest]: {
    handler: registServiceHandler,
  },
  [config.packetType.service.PingRes]: {
    handler: pingHandler,
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    return false;
  }

  return handlers[packetType].handler;
};
