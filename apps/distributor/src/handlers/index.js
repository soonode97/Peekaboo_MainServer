import config from '@peekaboo-ssr/config/distributor';
import { registServiceHandler } from './service/registService.handler.js';

const handlers = {
  [config.CreateServiceRequest]: {
    handler: registServiceHandler,
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    return false;
  }

  return handlers[packetType].handler;
};
